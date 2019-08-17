const express = require('express');
const async = require("async");
const path = require('path');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const Data = require('./data');
const config = require('./config.json');

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
mongoose.connect(config.dbroute, { useNewUrlParser: true })
mongoose.connection.once('open', () => console.log('connected to the database'));
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
        .exec( (err, data) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, data: data });
        });
});

//
// Fetch blog stores
//
router.get('/blog/article/get', (req, res) => {
    const { category, skip, limit } = req.body

    //
    // Modify query according to optional arguments
    //
    var query = {};
    if (category) {
        query.categories = {
            $elemMatch: { 
                $eq: ObjectId(category)
            }
        }
    }

    //
    // We'll return all categories at the same time
    // (so a page can present a full list).
    // Do this in parallel with fetching the articles.
    //
    async.parallel({
        articles: function(callback) {
            Data.Article.find(query)
                .sort({created:-1})
                .skip(skip || 0)
                .limit(limit || 5)
                .populate("author")
                .exec( callback )
        },
        categories: function(callback) {
            Data.Category.find(callback);
        }
    }, function(err,results) {
        if (err) return res.json({ success: false, error: err });
        return res.json({ 
            success: true, 
            categories: results.categories, 
            articles: results.articles
        });
    });
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
app.listen(config.port, () => console.log(`Listening on port ${config.port}`));