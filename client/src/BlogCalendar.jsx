import React, { Component } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import queryString from 'query-string';

//
// This object is a little confusing because we are
// attempting to keep the state of our object sync'ed to
// the state of the contained calendar
//
class BlogCalendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            year: this.props.year,
            month: this.props.month,
            active: {
                days: [],
                months: []
            }
        };

        this.updateDate = this.updateDate.bind(this);
        this.clickDay = this.clickDay.bind(this);
        this.clickMonth = this.clickMonth.bind(this);
        this.inactiveDay = this.inactiveDay.bind(this);
    }
    
    componentDidMount() {
        this.updateDate(this.state.year,this.state.month);
    }

    //
    // This is needed to interpret url query arguments when they change,
    // since react-router-dom does not remount objects if the root
    // url address is unchanged.
    //
    componentDidUpdate(prevProps) {
        if (prevProps.year != this.props.year || prevProps.month != this.props.month) {
            this.updateDate(this.props.year,this.props.month);
        }
    }

    updateDate(year,month) {
        axios.get("/api/blog/days", {
            params: {
                year: year,
                month: month
            }
        })
        .then( res => {
            if (!res.data.success) throw res.data.error;
            const target = new Date(res.data.target);
            this.setState({
                active: res.data,
                year: target.getFullYear(),
                month: target.getMonth()
            });
        })
        .catch( err => {
            console.log(err.errmsg || err);
        });       
    }

    // by the way, "getDate" fetches the day of the month
    inactiveDay(day) {
        switch(day.view) {
            case "month":
                return !this.state.active.days.includes(day.date.getDate());
            case "year":
                return !this.state.active.months.find( m => (
                    m.year == day.date.getFullYear() && m.month == day.date.getMonth()+1
                ));
            case "decade":
                return !this.state.active.months.find( m => (
                    m.year == day.date.getFullYear()
                ));
            case "century":
                return !this.state.active.months.find( m => (
                    Math.floor(m.year/10) == Math.floor(day.date.getFullYear()/10)
                ));
        }

        return false;
    }

    clickDay(day) {
        this.props.history.push("/blog?" + queryString.stringify({
            month: day.getMonth() + 1,
            year: day.getFullYear(),
            day: day.getDate()
        }))
    }

    clickMonth(day) {
        this.props.history.push("/blog?" + queryString.stringify({
            month: day.getMonth() + 1,
            year: day.getFullYear()
        }))
    }

    render() {
        const { year, month } = this.state;

        const date = year ? new Date(year,month||0) : new Date();

        return (
            <Calendar
                onActiveDateChange={d => this.updateDate(d.getFullYear(),d.getMonth)}
                value={date}
                onClickDay={this.clickDay}
                onClickMonth={this.clickMonth}
                tileDisabled={this.inactiveDay}
                showNeighboringMonth={false}
                maxDate={new Date}
            />
        );
    }
};

export default BlogCalendar;