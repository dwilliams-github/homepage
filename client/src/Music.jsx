import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { Helmet } from "react-helmet";
import Banner from './Banner';
import Side from './Side';
import BeatLoader from 'react-spinners/BeatLoader';
import axios from 'axios';
import './css/music.css';

function ShowGigs(props) {
    const { gigs } = props;

    return (
        <Fragment>
        {gigs.sort( (a,b) => b.start_msec - a.start_msec ).map( d => (
            <div className="show" key={d._id}>
                <div className="title">{d.title}</div>
                <div className="author">{d.authors}</div>
                <div className="pres">
                    Presented by {urlOrNot(d.group)}, music director {urlOrNot(d.director)}
                </div>
                <div className="venue">{urlOrNot(d.venue)}</div>
                <div className="dates">
                    {timeStampToDate(d.start_date)} to {timeStampToDate(d.end_date)}
                </div>
                <div className="pos">{d.position}</div>
            </div>
        ))}
        </Fragment>
    )
}


function Music() {
    const [data, setData] = useState({loading: true, gigs:[]});

    useEffect( () => {
        axios.get("/api/music/get")
        .then( (res) => {
            if (!res.data.success) throw res.error;
            setData({
                loading: false,
                gigs: res.data.data.map(g => ({...g, start_msec: Date.parse(g.start_date)}))
            });
        })
        .catch( (err) => {
            console.log(err);
        });
    }, []);

    const sides = [
        {
            title: "Links",
            items: [
                <a href="http://www.trumpetguild.org/">
                    Internation Trumpet Guild
                </a>,
                <a href="http://www.trumpetherald.com/">
                    The Trumpet Herald
                </a>
            ]
        },
        {
            special: "site"
        },
        {
            special: "about"
        }
    ];

    return (
        <div className="music content">
            <Helmet>
                <title>David C. Williams, Ph.D.</title>
                <meta name="description" content="Music"/>
                <link rel="canonical" href="https://slashdave.com/music"/>
            </Helmet>
            <Banner />
            <div id="bannercaption">Music</div>
            <Side contents={sides}/>
            <h3><a name="groups">Groups</a></h3>
            <p>Here are the musical groups that I am most active with lately</p>
            <ul>
                <li><a href="http://newarksymphonic.org/">Newark Symphonic Winds</a>, a community-based concert band</li>
                <li>Brass Menagerie, a brass quintet</li>
                <li><a href="https://starstrucktheatre.org/">Starstruck</a>, a youth performing arts organization</li>
            </ul>
            <h3><a name="shows">Shows</a></h3>
            <p>Here is a list of the shows I have been involved with. There is a bit of history to go through here, so I apologize in advance if I got any details wrong, or missed a show.</p>
            {data.loading ? <BeatLoader color="#FFFF99" />  : ""}
            <ShowGigs {...data} />
        </div>
    )
}


function timeStampToDate(ts) {
    return new Date(ts).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' } );
}


function urlOrNot(o) {
    return o.url ? <a href={o.url}>{o.name}</a> : <span>{o.name}</span>;
}

        
export default Music;