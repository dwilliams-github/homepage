import pymysql
from pymongo import MongoClient
import datetime, os
import pypandoc

#
# Must install pandoc first ("brew install pandoc")
#

#
# Connect to old database (copied to local machine)
#
dbold = pymysql.connect( database="dwilliams_django", user="dwilliams", password="wierdo" )
cursor = dbold.cursor()

#
# Connect to our new mongoDB
#
client = MongoClient('mongodb+srv://webhome:oKcpOUraIdmPLyIb@cluster0-gyfof.mongodb.net/blog?retryWrites=true&w=majority&ssl_cert_reqs=CERT_NONE')
db = client.home

#
# Get rid of old copies
#
db["Article"].drop()
db["Author"].drop()
db["Picture"].drop()
db["Category"].drop()


#
# We have a many to many relation, which we'll convert mongo style
#
# Start by fetching categories
#
categories = {}

cursor.execute( "SELECT id, name FROM blog_category" )
for row in cursor.fetchall():
    [id,name] = row
    result = db.Category.insert_one({
        'name': name
    })
    categories[id] = result.inserted_id

#
# Now fetch the links
# This table was not cleaned up and has invalid ids. Just skip them.
#
catlinks = {}

cursor.execute( "SELECT article_id, category_id FROM blog_article_category" )
for row in cursor.fetchall():
    [aid,cid] = row
    try:
        cat_id = categories[cid]
    except KeyError:
        continue
    try:
        catlinks[aid].append(cat_id)
    except KeyError:
        catlinks[aid] = [cat_id]

#
# Make an author
#
result = db.Author.insert_one({
    'name': 'David Williams'
})
author_id = result.inserted_id

#
# Now the pictures
# Here we dump the images themselves
#
pictures = {}

cursor.execute( "SELECT article_id, image, caption FROM blog_picture" )
for row in cursor.fetchall():
    [article_id, image, caption] = row
    if not os.path.exists(image): continue

    result = db.Picture.insert_one({
        'image': open(image,"rb").read(),
        'caption': caption
    })
    try:
        pictures[article_id].append(result.inserted_id)
    except KeyError:
        pictures[article_id] = [result.inserted_id]

#
# Port stories
#
cursor.execute( "SELECT id, title, body, created, modified FROM blog_article" )
for row in cursor.fetchall():
    [aid,title,body,created,modified] = row
    result = db.Article.insert_one({
        'title': title,
        'body': pypandoc.convert_text(body,'markdown-smart', format='rst'),
        'author': author_id,
        'categories': catlinks.get(aid,[]),
        'pictures': pictures.get(aid,[]),
        'created': created,
        'modified': modified
    })


