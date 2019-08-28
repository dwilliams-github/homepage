import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import queryString from 'query-string';
import BeatLoader from 'react-spinners/BeatLoader';
import { FaEllipsisH } from 'react-icons/fa';
import moment from 'moment';


class BlogArchive extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            months: [],
            showAll: false
        };

        this.showAll = this.showAll.bind(this);
    }
    
    componentDidMount() {
        axios.get("/api/blog/months")
        .then( res => {
            if (!res.data.success) throw res.data.error;
            this.setState({
                months: res.data.data,
                loading: false
            });
        })
        .catch( err => {
            console.log(err.errmsg || err);
        });
    }

    showAll() {
        this.setState({
            showAll: true
        })
    }

    render() {
        const { loading, months, showAll } = this.state;

        if (loading) {
            return <BeatLoader color="#FFFF99" />
        }

        //
        // To keep things tidy, show only top 6, unless the user
        // clicks on the ellipse
        //
        // Note that we number months from one, which is not a javascript
        // convention. The months in the records returned from the api
        // follow this convention.
        //
        // Don't forget that Date takes month counting from zero.
        //
        const num_show = showAll ? months.length : Math.min(months.length,6);

        const date_options = { month: 'long', year: 'numeric' };
        const month_divs = months.slice(0,num_show).map( m => (
            <div key={"arch"+m.year+m.month}>
                <Link to={"/blog?" + queryString.stringify(m)}>
                    {moment().year(m.year).month(m.month).format('MMMM YYYY')}
                </Link>
            </div>
        ));

        if (num_show < months.length) {
            month_divs.push((
                <div key="archmove">
                    <a className="clickable" onClick={this.showAll}><FaEllipsisH /></a>
                </div>
            ))
        }

        return month_divs;
    }
};

export default BlogArchive;