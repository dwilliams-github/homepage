import React, { useState,  useEffect } from 'react';
import BlogArticle from './BlogArticle';
import BlogPager from './BlogPager';
import BeatLoader from 'react-spinners/BeatLoader';
import axios from 'axios';

function dayOnly(ts) {
    let d = new Date(ts);
    d.setHours(0,0,0,0);
    return d.getTime();
}

function BlogArticleList(props) {
    const { year, month, day, cat, page } = props;

    const [data,setData] = useState({
        articles: [],
        loading: true,
        isMore: false
    });

    //
    // We page in units of 4, but always ask for one more.
    // If we get five back, it means there are more to show.
    //
    useEffect( () => {
        axios.get("/api/blog/article/get", {
            params: {
                year: year,
                month: month,
                day: day,
                cat: cat,
                skip: page*4,
                limit: 5
            }
        })
        .then( (res) => {
            if (!res.data.success) throw res.data.error;
            setData({
                articles: res.data.articles.slice(0,4),
                loading: false,
                isMore: res.data.articles.length > 4
            });
        })
        .catch( (err) => {
            console.log(err);
        });  
    },[ year, month, day, cat, page ]);

    //
    // Loading or empty?
    //
    if (data.loading) {
        return <BeatLoader color="#FFFF99" />;
    } else if  (data.articles == undefined || data.articles.length == 0) {
        return <div className="articles">No articles found</div>;
    }

    //
    // My design is sort of annoying because it groups articles
    // by date. Do that grouping now, keeping in mind that the
    // articles are already sorted by date/time by the api.
    //
    const grouped = data.articles.map( a => ({ 
        ...a, 
        day: dayOnly(a.created)
    })).reduce( (g,a) => {
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

    //
    // Props needed to fully construct a url link (minus page)
    //
    const linkProps = {
        year: year,
        month: month,
        day: day,
        cat: cat
    }

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
            <BlogPager isMore={data.isMore} linkProps={linkProps} {...props}/>
        </div>
    )
}

export default BlogArticleList;