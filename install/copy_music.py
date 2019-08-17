import pymysql
from pymongo import MongoClient
import datetime

#
# Connect to old database (copied to local machine)
#
dbold = pymysql.connect( database="dwilliams_django", user="dwilliams", password="wierdo" )
cursor = dbold.cursor()

#
# Connect to our new mongoDB
#
client = MongoClient('mongodb+srv://webhome:oKcpOUraIdmPLyIb@cluster0-gyfof.mongodb.net/music?retryWrites=true&w=majority&ssl_cert_reqs=CERT_NONE')
db = client.home


#
# Port groups
#
groups = {}

cursor.execute( "SELECT id, name, url FROM music_group" )
for row in cursor.fetchall():
    [id,name,url] = row
    result = db.Group.insert_one({
        'name': name,
        'url': url
    })
    groups[id] = result.inserted_id

#
# Port directors
#
directors = {}

cursor.execute( "SELECT id, name, email, url FROM music_director" )
for row in cursor.fetchall():
    [id,name,email,url] = row
    result = db.Director.insert_one({
        'name': name,
        'email': email,
        'url': url
    })
    directors[id] = result.inserted_id


#
# Port venues
#
venues = {}

cursor.execute( "SELECT id, name, address, url FROM music_venue" )
for row in cursor.fetchall():
    [id,name,address,url] = row
    result = db.Venue.insert_one({
        'name': name,
        'address': address,
        'url': url
    })
    venues[id] = result.inserted_id

#
# Finally, gigs
#
# Note that pymongo doesn't support dates with times, so add a blank time to dates
#
"""
CREATE TABLE `music_gig` (
  `id` int(11) NOT NULL,
  `title` varchar(80) NOT NULL,
  `group_id` int(11) NOT NULL,
  `director_id` int(11) NOT NULL,
  `venue_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `position` varchar(60) NOT NULL,
  `authors` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
"""

cursor.execute( "SELECT title, group_id, director_id, venue_id, start_date, end_date, position, authors FROM music_gig" )
for row in cursor.fetchall():
    [title,group_id,director_id,venue_id,start_date,end_date,position,authors] = row
    result = db.Gig.insert_one({
        'title': title,
        'authors': authors,
        'group': groups[group_id],
        'director': directors[director_id],
        'venue': venues[venue_id],
        'position': position,
        'start_date': datetime.datetime.combine(start_date, datetime.time.min),
        'end_date': datetime.datetime.combine(end_date, datetime.time.min)
    })
