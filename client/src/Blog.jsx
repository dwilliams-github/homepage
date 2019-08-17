import React, { Component } from 'react';
import Banner from './Banner';
import BlogArticle from './BlogArticle';
import Side from './Side';
import axios from 'axios';
import './css/styles-site.css';
import './css/blog.css';

class Blog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            articles: []
        };
    }

    componentDidMount() {
        axios.get("/api/blog/article/get")
        .then( (res) => {
            if (!res.data.success) throw res.error;
            this.setState({
                categories: res.data.categories,
                articles: res.data.articles
            });
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    render() {
        const { articles, categories } = this.state;

        //
        // My design is sort of annoying because it groups articles
        // by date. Do that grouping now, keeping in mind that the
        // articles are already sorted by date by the api.
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
            <div className="blog content">
                <Banner />
                <div id="bannercaption">The mad ramblings of a scientist</div>
                {grouped.map( g => (
                    <div className="day" key={g.day}>
                        <div className="date">
                            {g.day.toLocaleDateString("en-US", {
                                weekday: 'long', 
                                month: 'long', 
                                day: 'numeric', 
                                year: 'numeric'
                            })}
                        </div>
                        {g.articles.map(a => (
                            <BlogArticle article={a} categories={categories} key={a._id} />
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
    return d;
}


export default Blog;