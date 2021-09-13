import React, { useState, useEffect, useCallback, useRef } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import queryString from 'query-string';
import 'react-calendar/dist/Calendar.css';

function BlogCalendar(props) {
    //
    // The date we are showing
    //
    const [activeDate, setActiveDate] = useState(new Date());

    //
    // Our props can change if links are clicked, in which case
    // we reset the date shown. We need to formally propagate this.
    //
    // Note that we count months from 1, but Date() counts from zero.
    //
    useEffect( () => {
        setActiveDate(
            props.year ? new Date(props.year,props.month ? props.month-1 : 0) : new Date()
        )
    }, [props.year, props.month])

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
    // Update list of active days (asynchronously), when necessary
    //
	const cancelRef = useRef({ token: axios.CancelToken });

    useEffect( () => {
        //
		// Use axios cancellation to preserve order of requests
		//
		const cancel = cancelRef.current;
		cancel.source && cancel.source.cancel();
		cancel.source = cancel.token.source();
        
        axios.get("/api/blog/days", {
            params: {
                year: activeDate.getFullYear(),
                month: activeDate.getMonth()+1,
                cat: props.cat,
                timezone: "America/Los_Angeles"
            },
			cancelToken: cancel.source.token
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
            if (!axios.isCancel(err)) {
                console.log(err.errmsg || err);
            }
        }); 
    }, [activeDate, props.cat]);

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
            activeStartDate={activeDate}
            onActiveStartDateChange={({activeStartDate}) => setActiveDate(activeStartDate)}
            tileDisabled={tileDisabled}
            onClickDay={clickDay}
            onClickMonth={clickMonth}
            showNeighboringMonth={false}
            maxDate={new Date}
        />
    );

}

export default BlogCalendar;