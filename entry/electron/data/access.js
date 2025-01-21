const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const formidable = require('formidable');
const fs = require('fs');

const Data = require('./data');
const config = require('./config.json');


function service(port) {

    //
    // Our server app
    //
    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //
    // Open database
    //
    // Note that, by default, mongoose keeps a global state, and after
    // the connection all schemas (previously declared or not) will be 
    // associated to that one database.
    //
    mongoose.connect(config.dbroute)
    mongoose.connection.once('open', () => console.log('Connected to database'));
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

    // -------

    //
    // Fetch gigs
    //
    app.get('/gigs/get', (req, res) => {
        Data.Gig.find()
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            });
    });

    //
    // Add a gig
    //
    // Return new row
    //
    app.get('/gigs/add', (req, res) => {
        Data.Gig.create( req.query )
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            });
    });

    //
    // Update gigs (one at a time)
    //
    app.get('/gigs/update', (req, res) => {
        const { id, values } = req.query;
        Data.Gig.updateOne( { '_id': id }, values )
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            });
    });

    //
    // Remove single venue
    //
    app.get('/gigs/remove', (req, res) => {
        const { id } = req.query;
        Data.Gig.findByIdAndRemove( id )
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            });
    });

    // -------

    //
    // Fetch venues
    //
    app.get('/venues/get', (req, res) => {
        Data.Venue.find()
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            });
    });

    //
    // Add a venue
    //
    // Return new row
    //
    app.get('/venues/add', (req, res) => {
        Data.Venue.create( req.query )
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            })
    });

    //
    // Update venues (one at a time)
    //
    app.get('/venues/update', (req, res) => {
        const { id, values } = req.query;
        Data.Venue.updateOne( { '_id': id }, values )
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            });
    });

    //
    // Remove single venue
    //
    app.get('/venues/remove', (req, res) => {
        const { id } = req.query;
        Data.Venue.findByIdAndRemove( id )
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            });
    });

    // -------

    //
    // Fetch groups
    //
    app.get('/groups/get', (req, res) => {
        Data.Group.find()
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            });
    });

    //
    // Add a group
    //
    // Return new row
    //
    app.get('/groups/add', (req, res) => {
        Data.Group.create( req.query )
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            })
    });

    //
    // Update groups (one at a time)
    //
    app.get('/groups/update', (req, res) => {
        const { id, values } = req.query;
        Data.Group.updateOne( { '_id': id }, values )
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            });
    });

    //
    // Remove single group
    //
    app.get('/groups/remove', (req, res) => {
        const { id } = req.query;
        Data.Group.findByIdAndRemove( id )
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            });
    });

    // -------
    
    //
    // Fetch directors
    //
    app.get('/directors/get', (req, res) => {
        Data.Director.find()
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            })
    });

    //
    // Add a director
    //
    // Return new row
    //
    app.get('/directors/add', (req, res) => {
        Data.Director.create( req.query )
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            })
    });

    //
    // Update directors (one at a time)
    //
    app.get('/directors/update', (req, res) => {
        const { id, values } = req.query;
        Data.Director.updateOne( { '_id': id }, values )
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            });
    });

    //
    // Remove single director
    //
    app.get('/directors/remove', (req, res) => {
        const { id } = req.query;
        Data.Director.findByIdAndRemove( id )
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            });
    });

    // -------
    
    //
    // Fetch blogs
    //
    app.get('/blogs/get', (req, res) => {
        Data.Article.find()
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            });
    });

    //
    // Fetch categories.
    // For now these are fixed (there is no way to add one)
    //
    app.get('/blogs/cats', (req, res) => {
        Data.Category.find()
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            });
    });


    //
    // Add a blog article
    //
    // Return new row
    //
    app.get('/blogs/add', (req, res) => {
        Data.Article.create( req.query )
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            })
    });

    //
    // Update blog articles (one at a time)
    //
    app.get('/blogs/update', (req, res) => {
        const { id, values } = req.query;
        Data.Article.updateOne( { '_id': id }, values )
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            });
    });

    //
    // Remove single blog article
    //
    app.get('/blogs/remove', (req, res) => {
        const { id } = req.query;
        Data.Article.findByIdAndRemove( id )
            .then( (data) => {
                res.json({ success: true, data: data });
            })
            .catch( (err) => {
                res.json({ success: false, error: err });
            });
    });

    //
    // Remove given picture from a blog article
    //
    app.get('/blogs/picture/drop', (req, res) => {
        const { id, picture } = req.query;
        Data.Article
            .updateOne( 
                { '_id': id },
                { $pull: { pictures: picture } }
            )
            .then( (d) => {
                // Count remaining references to this picture
                return Data.Article.countDocuments({ pictures: picture }).exec();
            })
            .then( data => {
                //
                // Delete picture itself (asynchronously) if no one else is using it
                //
                if (data === 0) Data.Picture.findOneAndDelete( {'_id': picture } ).exec();
                res.json({ success: true, data: data });
            })
            .catch( err => {
                res.json({ success: false, error: err });
            });
    });

    //
    // Add picture (multipart form).
    // Returns id of inserted picture.
    //
    app.post('/blogs/picture/post', (req, res) => {
        new formidable.IncomingForm().parse(req, (err,fields,files) => {
            if (err) {
                res.json({ success: false, error: err })
                return;
            }

            const { caption, id } = fields;

            //
            // Chain query: load file, then link
            //
            Data.Picture.create({ image: fs.readFileSync(files.image[0].filepath), caption: caption[0] })
                .then( (pic) => {
                    Data.Article.updateOne( { '_id': id[0] }, {$push: {pictures: pic.id}} )
                        .then( () => {
                            res.json({ success: true, data: pic.id });
                        })
                })
                .catch( (err) => {
                    res.json({ success: false, error: err });
                });
        });
    });

    // launch
    app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = {
    service: service
}