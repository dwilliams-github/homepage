import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import queryString from 'query-string';
import BeatLoader from 'react-spinners/BeatLoader';

function BlogCategories({year, month, day}) {
    const [data, setData] = useState({loading: false, categories: []});

    useEffect( () => {
        axios.get("/api/blog/categories")
        .then( res => {
            if (!res.data.success) throw res.data.error;
            setData({
                categories: res.data.data,
                loading: false
            });
        })
        .catch( err => {
            console.log(err.errmsg || err);
        });
    }, []);

    if (data.loading) {
        return <BeatLoader color="#FFFF99" />
    }

    //
    // We drop the page property when changing categories
    //
    return data.categories.map( c => (
        <div key={"bcat" + c._id}>
            <Link to={"/blog?" + queryString.stringify({
                year: year,
                month: month,
                day: day,
                cat: c._id
            })}>{c.name}</Link>
        </div>
    ));
};

export default BlogCategories;