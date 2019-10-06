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

    //
    // Fetch gigs
    //
    app.get('/gigs/get', (req, res) => {
        Data.Gig.find()
            .populate("group")
            .populate("director")
            .populate("venue")
            .exec( (err, data) => {
                if (err) return res.json({ success: false, error: err });
                return res.json({ success: true, data: data });
            });
    });

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
    // Return new id...
    //
    app.get('/venues/add', (req, res) => {
        Data.Venue
            .create( req.query )
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
        Data.Venue
            .updateOne( { '_id': id }, JSON.parse(values) )
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
        Data.Venue
            .findByIdAndRemove( id )
            .exec( (err, data) => {
                if (err) return res.json({ success: false, error: err });
                return res.json({ success: true, data: data });
            });
    });

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

    // launch
    app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = {
    service: service
}