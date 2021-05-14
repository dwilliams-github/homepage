import React from 'react';
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';
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
        const created = moment(article.created);
        const modified = moment(article.modified);

        const altered = article.modified && modified.diff(created,'minutes') > 10;

        const imageToBase64 = i => new Buffer(i.data).toString("base64");

        return (
            <div className="body">
                <div className="title">{article.title}</div>
                {article.pictures.map( (p,index) => (
                    <div className="picture" key={"bp_"+index}>
                        <img alt={p.caption} src={"data:image/jpeg;base64," + imageToBase64(p.image)}/>
                    </div>
                ))}
                <Markdown children={article.body} remarkPlugins={[gfm]}/>
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
                <div style={{clear: "both"}}/>
            </div>
        )
    }
};


export default BlogArticle;