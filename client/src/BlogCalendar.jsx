import React, { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import queryString from 'query-string';

function BlogCalendar(props) {
    const [value, setValue] = useState(
        props.year ? new Date(props.year,props.month ? props.month-1 : 0) : new Date()
    );

    //
    // The days and months with activity (at least one article)
    //   * months: all years/months
    //   * days: days for given targetMonth
    //
    const [active, setActive] = useState({
        months: [],
        targetMonth: undefined,
        days: []
    });

    //
    // The month we are viewing. We need to keep
    // track of this, so that we can update active days.
    //
    // We keep this separate from the active hook above,
    // to keep update logic clean:
    //     new month clicked => set activeMonth
    //     new activeMonth => make API query
    //     API query finished => set active
    //     active changed => update tileDisabled callback 
    //
    // While active is being updated, we just display all
    // days as inactive
    //
    const [activeMonth, setActiveMonth] = useState({
        year: value.getFullYear(),
        month: value.getMonth()+1
    });

    //
    // Our props can change if links are clicked, in which case
    // we reset the date shown. We need to formally propagate this.
    //
    useEffect( () => {
        setValue(props.year ? new Date(props.year,props.month ? props.month-1 : 0) : new Date())
        setActiveMonth({
            year: props.year,
            month: props.month
        })
    }, [props.year, props.month])

    //
    // The calendar will tell us if the active date has changed.
    // We'll need to update the active month, to trigger an API call.
    //
    const setActiveDate = ({view, activeStartDate}) => {
        if (activeMonth === undefined || view == "month") {
            setActiveMonth({
                year: activeStartDate.getFullYear(),
                month: activeStartDate.getMonth()+1
            });
        }
    }

    //
    // Update list of active days (synchronously), when necessary
    //
    useEffect( () => {
        axios.get("/api/blog/days", {
            params: {
                year: activeMonth ? activeMonth.year : undefined,
                month: activeMonth ? activeMonth.month : undefined,
                cat: props.cat,
                timezone: "America/Los_Angeles"
            }
        })
        .then( res => {
            if (!res.data.success) throw res.data.error;
            //
            // The API returns the next active month, so the target
            // date may not match the query
            //
            const target = new Date(res.data.target);
            setActive({
                months: res.data.months,
                targetMonth: {
                    year: target.getFullYear(),
                    month: target.getMonth()+1
                },
                days: res.data.days
            });
        })
        .catch( err => {
            console.log(err.errmsg || err);
        }); 
    }, [activeMonth, props.cat]);

    //
    // Decide if a calendar element is active, based on whether
    // it includes any articles.
    //
    // We keep a list of all active months, but only the days
    // of the month for a given month. 
    //
    const tileDisabled = useCallback( ({date, view}) => {
        if (active.targetMonth === undefined) return true;

        switch(view) {
            case "month":
                return (
                    active.targetMonth.year != date.getFullYear() ||
                    active.targetMonth.month != date.getMonth()+1 ||
                    !active.days.includes(date.getDate())
                );
            case "year":
                return !active.months.find( m => (
                    m.year == date.getFullYear() && m.month == date.getMonth()+1
                ));
            case "decade":
                return !active.months.find( m => (
                    m.year == date.getFullYear()
                ));
            case "century":
                return !active.months.find( m => (
                    Math.floor(m.year/10) == Math.floor(date.getFullYear()/10)
                ));
        }
    }, [active]);

    //
    // What happens if we click (an active) day
    //
    const clickDay = useCallback( (day) => {
        props.history.push("/blog?" + queryString.stringify({
            month: day.getMonth() + 1,
            year: day.getFullYear(),
            day: day.getDate(),
            cat: props.cat
        }))
    }, [props.cat]);

    //
    // What happens if we click (an active) month
    //
    const clickMonth = useCallback( (day) => {
        props.history.push("/blog?" + queryString.stringify({
            month: day.getMonth() + 1,
            year: day.getFullYear(),
            cat: props.cat
        }))
    }, [props.cat]);

    return (
        <Calendar
            value={value}
            onChange={setValue}
            tileDisabled={tileDisabled}
            onViewChange={setActiveDate}
            onActiveStartDateChange={setActiveDate}
            onClickDay={clickDay}
            onClickMonth={clickMonth}
            showNeighboringMonth={false}
            maxDate={new Date}
        />
    );

}

export default BlogCalendar;