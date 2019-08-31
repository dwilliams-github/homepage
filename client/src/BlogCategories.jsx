import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import queryString from 'query-string';
import BeatLoader from 'react-spinners/BeatLoader';

class BlogCategories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            categories: []
        };
    }
    
    componentDidMount() {
        axios.get("/api/blog/categories")
        .then( res => {
            if (!res.data.success) throw res.data.error;
            this.setState({
                categories: res.data.data,
                loading: false
            });
        })
        .catch( err => {
            console.log(err.errmsg || err);
        });
    }


    render() {
        const { loading, categories } = this.state;

        if (loading) {
            return <BeatLoader color="#FFFF99" />
        }

        //
        // We drop the page property when changing categories
        //
        return categories.map( c => (
            <div key={"bcat" + c._id}>
                <Link to={"/blog?" + queryString.stringify({
                    year: this.props.year,
                    month: this.props.month,
                    day: this.props.day,
                    cat: c._id
                })}>{c.name}</Link>
            </div>
        ));
    }
};

export default BlogCategories;