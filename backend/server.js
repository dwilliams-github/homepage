const express = require('express');
const path = require('path');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const Data = require('./data');
require("dotenv").config();

//
// Our server app
//
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//
// Open database
//
// Note that, by default, mongoose keeps a global state, and after
// the connection all schemas (previously declared or not) will be 
// associated to that one database.
//
mongoose.connect(process.env.dbroute, { useNewUrlParser: true })
mongoose.connection.once('open', () => console.log('Connected to database'));
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

//
// We're going to dump our API into one route
//
const router = express.Router();

//
// Fetch all music gigs
//
router.get('/music/get', (req, res) => {
    Data.Gig.find()
        .populate("group")
        .populate("director")
        .populate("venue")
        .then( data => {
            res.json({ success: true, data: data });
        })
        .catch( err => {
            res.json({ success: false, error: err });
        });
});


//
// Fetch all recent months with some blog activity, in order
// newest to oldest
//
// This api is designed specifically to support the archive listing.
//
// It might be faster to fetch everything and sort them explicitly,
// but it's more fun to figure out how to do so in the aggregate.
// Note that year has to appear first in the group _id. 
//
router.get('/blog/months', (req, res) => {
    Data.Article
        .aggregate([
            {
                $group: { 
                    _id: { 
                        year: {$year: "$created"},
                        month: {$month: "$created"} 
                    }
                }
            },
            {
                $sort: {
                    "_id": -1
                }
            }
        ])
        .then( data => {
            res.json({ success: true, data: data.map(function(r){return r._id}) });
        })
        .catch( err => {
            res.json({ success: false, error: err });
        });
});


//
// Return days of the month that have at least one article following 
// the given target date, and all months with at least one article.
//
// This api is designed specifically to support the blog calendar.
//
router.get('/blog/days', (req, res) => {
    const { year, month, cat, timezone } = req.query;

    //
    // Find first article on or after given year and/or month
    //
    const target_date = year ? new Date( year, Number(month || 0) ) : new Date();

    query = {
        created: {$lte: target_date}
    };

    if (cat) {
        query.categories = {
            $elemMatch: { $eq: cat }
        }
    };

    Data.Article.find(query)
        .sort({created:-1})
        .limit(1)
        .then( results => {
            //
            // Return calendar info
            //
            BlogDays( res, results.length ? results[0].created : target_date, timezone );
        })
        .catch( err => {
            res.json({ success: false, error: err });
        });
});


function BlogDays(res,target_date,timezone) {
    //
    // Get start and end of month containing target date.
    // Note that javascript allows month to go out of range in which
    // case the year is incremented as needed.
    //
    // Oh, and month counts from 0 and day counts from 1. Just because.
    //
    date_obj = new Date(target_date);
    var year = date_obj.getFullYear();
    var month = date_obj.getMonth();

    var start = new Date(year, month, 1);
    var end = new Date(year, month+1, 1 );

    //
    // So, whereas our queries are using the local timezone,
    // the aggregate $dayOfMonth doesn't. Specify timezone explicitly.
    //
    Promise.all([
        Data.Article.aggregate([
            {
                $match: {
                    created: { $gte: start, $lt: end }
                }
            },
            {
                $group: {
                    _id: {
                        $dayOfMonth: {date: "$created", timezone: timezone}
                    }
                }
            }
        ]),
        Data.Article.aggregate([
            {
                $group: { 
                    _id: { 
                        year: {$year: "$created"},
                        month: {$month: "$created"}
                    }
                }
            }
        ])
    ]).then(([days, months]) => {
        res.json({ 
            success: true, 
            target: target_date,
            days: days.map(function(r){return r._id}), 
            months: months.map(function(r){return r._id})
        });
    }).catch(err => {
        if (err) res.json({ success: false, error: err });
    })
};


//
// Fetch blog categories
//
router.get('/blog/categories', (req, res) => {
    Data.Category
        .find()
        .then( data => {
            res.json({ success: true, data: data });
        })
        .catch( err => {
            res.json({ success: false, error: err });
        })
});

//
// Fetch blog stories
//
router.get('/blog/article/get', (req, res) => {
    const { cat, year, month, day, skip, limit } = req.query

    //
    // Modify query according to optional arguments
    //
    var query = {};

    if (cat) {
        query.categories = {
            $elemMatch: { $eq: cat }
        }
    }

    var I = i => Number(i);

    var start, end;
    if (day) {
        start = new Date( I(year), I(month)-1, I(day) );
        end = new Date( I(year), I(month)-1, I(day)+1 );
    } else if (month) {
        start = new Date( I(year), I(month)-1 );
        end = new Date( I(year), I(month) );
    } else if (year) {
        start = new Date( I(year), 0 );
        end = new Date( I(year)+1, 0 );
    }
    if (start) {
        query.created = {
            $gte: start, 
            $lt: end
        }
    }
    
    Data.Article.find(query)
        .sort({created:-1})
        .skip(skip ? parseInt(skip) : 0)
        .limit(limit ? parseInt(limit): 5)
        .populate("pictures")
        .populate("author")
        .populate("categories")
        .then( results => {
            res.json({ success: true,  articles: results });
        })
        .catch( err => {
            res.json({ success: false, error: err });
        });
});

// In case someone calls a missing or misnamed api.
// Without this, the requester will get index.html.
router.get('*', (req,res) => {
    res.status(404).send("Not found");
});

// Serve the static files from the React app
app.use('/public', express.static(path.join(__dirname, '/public')));

// append /api for our api requests
app.use('/api', router);

// Issue index.html for any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname,'static','index.html'));
});

// launch
app.listen(process.env.port, () => console.log(`Listening on port ${process.env.port}`));