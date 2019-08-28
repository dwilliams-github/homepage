import React, { Component } from 'react';
import Banner from './Banner';
import BlogArticleList from './BlogArticleList';
import BlogCalendar from './BlogCalendar';
import BlogArchive from './BlogArchive';
import BlogCategories from './BlogCategories';
import Side from './Side';
import queryString from 'query-string';
import './css/styles-site.css';
import './css/blog.css';

class Blog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const parsed = queryString.parse(this.props.location.search);

        const sides = [
            {
                items: [
                    <div className="calendar-wrap">
                        <BlogCalendar {...this.props} {...parsed} />
                    </div>
                ]
            },
            {
                title: 'Categories',
                items: [ <BlogCategories/> ]
            },
            {
                title: 'Archive',
                items: [ <BlogArchive/> ]
            },
            {
                special: "site"
            },
            {
                special: "about"
            }
        ]

        return (
            <div className="blog content">
                <Banner />
                <div id="bannercaption">The mad ramblings of a scientist</div>
                <Side contents={sides} />
                <BlogArticleList  {...this.props} {...parsed} />
            </div>
        )
    }
}

export default Blog;