const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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
    mongoose.connect(config.dbroute, { useNewUrlParser: true })
    mongoose.connection.once('open', () => console.log('Connected to database'));
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

    // -------

    //
    // Fetch gigs
    //
    app.get('/gigs/get', (req, res) => {
        Data.Gig.find()
            .exec( (err, data) => {
                if (err) return res.json({ success: false, error: err });
                return res.json({ success: true, data: data });
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
                return res.json({ success: true, data: data });
            })
            .catch( (err) => {
                return res.json({ success: false, error: err });
            })
    });

    //
    // Update gigs (one at a time)
    //
    // Note that url requests don't support nested json structures,
    // so manual parsing is required
    //
    app.get('/gigs/update', (req, res) => {
        const { id, values } = req.query;
        Data.Gig.updateOne( { '_id': id }, JSON.parse(values) )
            .exec( (err, data) => {
                if (err) return res.json({ success: false, error: err });
                return res.json({ success: true, data: data });
            });
    });

    //
    // Remove single venue
    //
    app.get('/gigs/remove', (req, res) => {
        const { id } = req.query;
        Data.Gig.findByIdAndRemove( id )
            .exec( (err, data) => {
                if (err) return res.json({ success: false, error: err });
                return res.json({ success: true, data: data });
            });
    });

    // -------

    //
    // Fetch venues
    //
    app.get('/venues/get', (req, res) => {
        Data.Venue.find()
            .exec( (err, data) => {
                if (err) return res.json({ success: false, error: err });
                return res.json({ success: true, data: data });
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
                return res.json({ success: true, data: data });
            })
            .catch( (err) => {
                return res.json({ success: false, error: err });
            })
    });

    //
    // Update venues (one at a time)
    //
    // Note that url requests don't support nested json structures,
    // so manual parsing is required
    //
    app.get('/venues/update', (req, res) => {
        const { id, values } = req.query;
        Data.Venue.updateOne( { '_id': id }, JSON.parse(values) )
            .exec( (err, data) => {
                if (err) return res.json({ success: false, error: err });
                return res.json({ success: true, data: data });
            });
    });

    //
    // Remove single venue
    //
    app.get('/venues/remove', (req, res) => {
        const { id } = req.query;
        Data.Venue.findByIdAndRemove( id )
            .exec( (err, data) => {
                if (err) return res.json({ success: false, error: err });
                return res.json({ success: true, data: data });
            });
    });

    // -------

    //
    // Fetch groups
    //
    app.get('/groups/get', (req, res) => {
        Data.Group.find()
            .exec( (err, data) => {
                if (err) return res.json({ success: false, error: err });
                return res.json({ success: true, data: data });
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
                return res.json({ success: true, data: data });
            })
            .catch( (err) => {
                return res.json({ success: false, error: err });
            })
    });

    //
    // Update groups (one at a time)
    //
    // Note that url requests don't support nested json structures,
    // so manual parsing is required
    //
    app.get('/groups/update', (req, res) => {
        const { id, values } = req.query;
        Data.Group.updateOne( { '_id': id }, JSON.parse(values) )
            .exec( (err, data) => {
                if (err) return res.json({ success: false, error: err });
                return res.json({ success: true, data: data });
            });
    });

    //
    // Remove single group
    //
    app.get('/groups/remove', (req, res) => {
        const { id } = req.query;
        Data.Group.findByIdAndRemove( id )
            .exec( (err, data) => {
                if (err) return res.json({ success: false, error: err });
                return res.json({ success: true, data: data });
            });
    });

    // -------
    
    //
    // Fetch directors
    //
    app.get('/directors/get', (req, res) => {
        Data.Director.find()
            .exec( (err, data) => {
                if (err) return res.json({ success: false, error: err });
                return res.json({ success: true, data: data });
            });
    });

    //
    // Add a director
    //
    // Return new row
    //
    app.get('/directors/add', (req, res) => {
        Data.Director.create( req.query )
            .then( (data) => {
                return res.json({ success: true, data: data });
            })
            .catch( (err) => {
                return res.json({ success: false, error: err });
            })
    });

    //
    // Update directors (one at a time)
    //
    // Note that url requests don't support nested json structures,
    // so manual parsing is required
    //
    app.get('/directors/update', (req, res) => {
        const { id, values } = req.query;
        Data.Director.updateOne( { '_id': id }, JSON.parse(values) )
            .exec( (err, data) => {
                if (err) return res.json({ success: false, error: err });
                return res.json({ success: true, data: data });
            });
    });

    //
    // Remove single director
    //
    app.get('/directors/remove', (req, res) => {
        const { id } = req.query;
        Data.Director.findByIdAndRemove( id )
            .exec( (err, data) => {
                if (err) return res.json({ success: false, error: err });
                return res.json({ success: true, data: data });
            });
    });

    // launch
    app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = {
    service: service
}