import React, { Component } from 'react';
import Markdown from 'react-markdown';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';

class BlogArticle extends React.Component {
    render() {
        const { article } = this.props;

        //
        // We only show the altered statement if the article was altered.
        // Also, ignore alteration dates within 10 minutes of original posting.
        //
        let created = moment(article.created);
        let modified = moment(article.modified);

        let altered = article.modified && modified.diff(created,'minutes') > 10;

        return (
            <div className="body">
                <div className="title">{article.title}</div>
                <Markdown source={article.body} />
                <div className="posted">
                    <div>
                        Posted at:&nbsp;
                        <Link to={"/blog/article?id=" + article._id}>
                            {created.tz("America/Los_Angeles").format('h:mm A z')}
                        </Link>
                        {altered ? (
                                <span>&nbsp;(Edited: {modified.tz("America/Los_Angeles").format('MMMM D, YYYY, h:mm A')})</span>
                            ) : null
                        }
                    </div>
                    <div>
                        Categories:&nbsp;
                        {article.categories.map( (c,index) => (
                            <span key={"c"+index}>{index ? ", " : " "}
                                <Link to={"/blog?" + queryString.stringify({cat:c._id})}>{c.name}</Link>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
};

export default BlogArticle;