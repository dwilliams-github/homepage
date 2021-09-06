import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import queryString from 'query-string';
import BeatLoader from 'react-spinners/BeatLoader';
import { FaEllipsisH } from 'react-icons/fa';
import { format } from 'date-fns';

function BlogArchive({ cat }) {
    const [data, setData] = useState({
        loading: true,
        months: [],
        showAll: false
    })

    //
    // We only need to fetch data once
    //
    useEffect( () => {
        axios.get("/api/blog/months")
        .then( res => {
            if (!res.data.success) throw res.data.error;
            setData({
                ...data,
                months: res.data.data,
                loading: false
            });
        })
        .catch( err => {
            console.log(err.errmsg || err);
        });
    }, []);

    const { loading, months, showAll } = data;

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
    const num_show = showAll ? months.length : Math.min(months.length,6);

    const month_divs = months.slice(0,num_show).map( m => (
        <div key={"arch"+m.year+m.month}>
            <Link to={"/blog?" + queryString.stringify({
                ...m,
                cat: cat
            })}>
                {format(new Date(m.year, m.month-1), 'MMMM yyyy')}
            </Link>
        </div>
    ));

    if (num_show < months.length) {
        month_divs.push((
            <div key="archmove">
                <a className="clickable" onClick={() => setData({...data, showAll: true})}><FaEllipsisH /></a>
            </div>
        ))
    }

    return month_divs;
};

export default BlogArchive;