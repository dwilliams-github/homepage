import React, { Component } from 'react';
import BlogArticle from './BlogArticle';
import BeatLoader from 'react-spinners/BeatLoader';
import axios from 'axios';

class BlogArticleList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            loading: true
        };
    }

    componentDidMount() {
        this.updateArticles();
    }

    //
    // This is needed to interpret url query arguments when they change,
    // since react-router-dom does not remount objects if the root
    // url address is unchanged.
    //
    componentDidUpdate(prevProps) {
        if (
            this.props.year != prevProps.year ||
            this.props.month != prevProps.month ||
            this.props.day != prevProps.day
        ) {
            this.updateArticles();
        }
    }

    updateArticles() {
        axios.get("/api/blog/article/get", {
            params: {
                year: this.props.year,
                month: this.props.month,
                day: this.props.day
            }
        })
        .then( (res) => {
            if (!res.data.success) throw res.error;
            this.setState({
                articles: res.data.articles,
                loading: false
            });
        })
        .catch( (err) => {
            console.log(err);
        });       
    }

    render() {
        const { articles, loading } = this.state;

        if (loading) {
            return <BeatLoader color="#FFFF99" />
        } else if  (articles == undefined || articles.length == 0) {
            return <div className="articles">No articles found</div>
        }

        //
        // My design is sort of annoying because it groups articles
        // by date. Do that grouping now, keeping in mind that the
        // articles are already sorted by date/time by the api.
        //
        let grouped = articles
            .map( a => ({ ...a, day: dayOnly(a.created)}) )
            .reduce( (g,a) => {
                const prev = g[g.length-1];
                if (prev && prev.day == a.day) {
                    prev.articles.push(a)
                } else {
                    g.push({
                        day: a.day,
                        articles: [a]
                    });
                }
                return g;
            }, []);

        return (
            <div className="articles">
                {grouped.map( g => (
                    <div className="day" key={g.day}>
                        <div className="date">
                            {new Date(g.day).toLocaleDateString("en-US", {
                                weekday: 'long', 
                                month: 'long', 
                                day: 'numeric', 
                                year: 'numeric'
                            })}
                        </div>
                        {g.articles.map(a => (
                            <BlogArticle article={a} key={a._id} />
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}

function dayOnly(ts) {
    let d = new Date(ts);
    d.setHours(0,0,0,0);
    return d.getTime();
}


export default BlogArticleList;