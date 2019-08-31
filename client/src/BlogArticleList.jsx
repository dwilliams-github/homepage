import React from 'react';
import BlogArticle from './BlogArticle';
import BlogPager from './BlogPager';
import BeatLoader from 'react-spinners/BeatLoader';
import axios from 'axios';

class BlogArticleList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            loading: true,
            isMore: false
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
            this.props.year  != prevProps.year ||
            this.props.month != prevProps.month ||
            this.props.day   != prevProps.day ||
            this.props.cat   != prevProps.cat ||
            this.props.page  != prevProps.page
        ) {
            this.updateArticles();
        }
    }

    updateArticles() {
        const page = this.props.page ? parseInt(this.props.page) : 0;

        //
        // We page in units of 4, but always ask for one more.
        // If we get five back, it means there are more to show.
        //
        axios.get("/api/blog/article/get", {
            params: {
                year: this.props.year,
                month: this.props.month,
                day: this.props.day,
                cat: this.props.cat,
                skip: page*4,
                limit: 5
            }
        })
        .then( (res) => {
            if (!res.data.success) throw res.data.error;
            this.setState({
                articles: res.data.articles.slice(0,4),
                loading: false,
                isMore: res.data.articles.length > 4
            });
        })
        .catch( (err) => {
            console.log(err);
        });       
    }

    render() {
        const { articles, loading, isMore } = this.state;

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

        //
        // Props needed to fully construct a url link (minus page)
        //
        const linkProps = {
            year: this.props.year,
            month: this.props.month,
            day: this.props.day,
            cat: this.props.cat
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
                <BlogPager isMore={isMore} linkProps={linkProps} {...this.props}/>
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