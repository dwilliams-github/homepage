import React from 'react';
import Banner from './Banner';
import BlogArticleList from './BlogArticleList';
import BlogCalendar from './BlogCalendar';
import BlogArchive from './BlogArchive';
import BlogCategories from './BlogCategories';
import Side from './Side';
import queryString from 'query-string';
import './css/blog.css';

function Blog(props) {
    const parsed = queryString.parse(props.location.search);

    const sides = [
        {
            items: [
                <div className="calendar-wrap">
                    <BlogCalendar {...props} {...parsed} />
                </div>
            ]
        },
        {
            title: 'Categories',
            items: [ <BlogCategories {...parsed}/> ]
        },
        {
            title: 'Archive',
            items: [ <BlogArchive {...parsed}/> ]
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
            <BlogArticleList  {...props} {...parsed} />
        </div>
    )
}

export default Blog;