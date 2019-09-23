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

    // launch
    app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = {
    service: service
}