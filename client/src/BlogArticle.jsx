import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';

class BlogArticle extends React.Component {
    render() {
        const { article } = this.props;

        let altered = article.modified && (Date.parse(article.modified) - Date.parse(article.created)) > 600;

        return (
            <div className="blogbody">
                <div className="title">{article.title}</div>
                <Markdown source={article.body} />
                <div className="posted">
                    <div>
                        Posted at:&nbsp;
                        <Link to={"/blog/article?id=" + article._id}>
                            {formatTime(article.created)}
                        </Link>
                        {altered ? (
                            <span> (Edited: {formatDateTime(article.modified)})</span>
                            ) : null
                        }
                    </div>
                    <div>
                        Categories:&nbsp;
                    </div>
                </div>
            </div>
        )
    }
};

function formatTime(d) {
    const date_options = { hour: '2-digit', minute: '2-digit', hour12: true }
    return new Date(d).toLocaleString('en-US',date_options)
}

function formatDateTime(d) {
    const date_options = { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }
    return new Date(d).toLocaleString('en-US',date_options)
}

export default BlogArticle;