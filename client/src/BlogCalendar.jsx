import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Calendar from 'react-calendar';
import axios from 'axios';
import queryString from 'query-string';


class BlogCalendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: props.targetDate || new Date(),
            active: []
        };

        this.setDate = this.setDate.bind(this);
        this.clickDay = this.clickDay.bind(this);
        this.inactiveDay = this.inactiveDay.bind(this);
    }
    
    componentDidMount() {
        axios.get("/api/blog/days", {
            params: {
                date: this.state.date
            }
        })
        .then( res => {
            if (!res.data.success) throw res.data.error;
            this.setState({
                active: res.data.days
            });
        })
        .catch( err => {
            console.log(err.errmsg || err);
        });
    }

    // by the way, "getDate" fetches the day of the month
    inactiveDay(day) {
        return day.date.getMonth() != this.state.date.getMonth() || !this.state.active.includes(day.date.getDate());
    }

    clickDay(day) {
        this.props.history.push("/blog?" + queryString.stringify({
            month: this.state.date.getMonth(),
            year: this.state.date.getFullYear(),
            day: day.getDate()
        }))
    }

    setDate(e) {
        this.setState({
            date: e.activeStartDate
        })
    }

    render() {
        const { date } = this.state;

        return (
            <Calendar
                onActiveDateChange={this.setDate}
                value={date}
                onClickDay={this.clickDay}
                tileDisabled={this.inactiveDay}
                showNeighboringMonth={false}
                maxDate={new Date}
            />
        );
    }
};

export default BlogCalendar;