const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema(
    {
        name: String,
        url: String
    },
    { 
        collection: 'Group',
        timestamps: true
    }
);

const DirectorSchema = new Schema(
    {
        name: String,
        email: String,
        url: String
    },
    { 
        collection: 'Director',
        timestamps: true
    }
);

const VenueSchema = new Schema(
    {
        name: String,
        address: String,
        url: String
    },
    { 
        collection: 'Venue',
        timestamps: true
    }
);

const GigSchema = new Schema(
    {
        title: String,
        authors: String,
        group: { 
            type: Schema.Types.ObjectId, 
            ref: 'Group' 
        },
        director: { 
            type: Schema.Types.ObjectId, 
            ref: 'Director'
        },
        position: String,
        venue: { 
            type: Schema.Types.ObjectId, 
            ref: 'Venue' 
        },
        start_date: Date,
        end_date: Date
    },
    { 
        collection: 'Gig',
        timestamps: true
    }
);

const AuthorSchema = new Schema(
    {
        name: String
    },
    {
        collection: 'Author',
        timestamps: true
    }
)

const CategorySchema = new Schema(
    {
        name: String
    },
    {
        collection: 'Category',
        timestamps: true
    }
)

const PictureSchema = new Schema(
    {
        image: Buffer,
        caption: String
    },
    {
        collection: 'Picture',
        timestamps: true
    }
)

const ArticleSchema = new Schema(
    {
        title: String,
        body: String,
        author:  {
            type: Schema.Types.ObjectId, 
            ref: 'Author' 
        },
        categories: [{
            type: Schema.Types.ObjectId, 
            ref: 'Category' 
        }],
        pictures: [{
            type: Schema.Types.ObjectId, 
            ref: 'Picture' 
        }],        
        created: Date,
        modified: Date
    },
    {
        collection: 'Article',
        timestamps: true
    }
)


module.exports = {
    Group: mongoose.model("Group", GroupSchema),
    Director: mongoose.model("Director", DirectorSchema),
    Venue: mongoose.model("Venue", VenueSchema),
    Gig: mongoose.model("Gig", GigSchema),
    Author: mongoose.model("Author", AuthorSchema),
    Category: mongoose.model("Category",CategorySchema),
    Picture: mongoose.model("Picture",PictureSchema),
    Article: mongoose.model("Article", ArticleSchema)
}
