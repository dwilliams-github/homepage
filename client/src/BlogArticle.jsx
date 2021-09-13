import React from 'react';
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { Buffer } from 'buffer';
import { format } from 'date-fns-tz';

function BlogArticle({ article }) {
    //
    // We only show the altered statement if the article was altered.
    // Also, ignore alteration dates within 10 minutes of original posting.
    //
    const created = new Date(article.created);
    const modified = new Date(article.modified);

    const altered = article.modified && modified-created > 600000;

    const imageToBase64 = i => new Buffer(i.data).toString("base64");

    return (
        <div className="body">
            <div className="title">{article.title}</div>
            {article.pictures.map( (p,index) => (
                <div className="picture" key={"bp_"+index}>
                    <img alt={p.caption} src={"data:image/jpeg;base64," + imageToBase64(p.image)}/>
                </div>
            ))}
            <Markdown children={article.body} remarkPlugins={[gfm]} linkTarget="_blank"/>
            <div className="posted">
                <div>
                    Posted at:&nbsp;
                    <Link to={"/blog/article?id=" + article._id}>
                        {format(created, 'h:mm aa zzz', {timeZone: "America/Los_Angeles"})}
                    </Link>
                    {altered ? 
                        (
                            <span>&nbsp;(Edited: {format(modified, 'h:mm aa zzz', {timeZone: "America/Los_Angeles"})})</span>
                        ) 
                        : null
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
            <div style={{clear: "both"}}/>
        </div>
    )
};


export default BlogArticle;