import React from 'react';
import Banner from './Banner';
import Side from './Side';
import { Link } from "react-router-dom";
import portrait from './images/portrait.jpg';
import react from './images/react.svg';
import aws from './images/aws_smile-header-desktop-en-white_59x35.png';
import godaddy from './images/godaddy.png';
import mongodb from './images/mongodb.svg';
import nodejs from './images/nodejs.svg';
import './css/about.css';

function About() {
    const links = [
        {
            url: "https://reactjs.org/",
            object: (
                <img 
                    style={{width: 30, marginTop: 3}} 
                    src={react} 
                    alt="Webfaction" 
                />
            )
        },
        {
            url: "http://aws.amazon.com/",
            object: (
                <img 
                    src={aws} 
                    alt="aws" 
                />
            )
        },
        {
            url: "http://www.godaddy.com/",
            object: (
                <img 
                    style={{width: 40}}
                    src={godaddy} 
                    alt="GoDaddy" 
                />
            )
        },
        {
            url: "https://www.mongodb.com/",
            object: (
                <img 
                    style={{width: 50}}
                    src={mongodb}
                    alg="mongoDB"
                />
            )
        },
        {
            url: "https://nodejs.org",
            object: (
                <img 
                    style={{width: 70}}
                    src={nodejs}
                    alg="node.js"
                />
            )
        }
    ];

    const sides = [
        {
            special: "site" 
        },
        {
            title: "Links",
            items: links.map( c => <a href={c.url}>{c.object}</a> )
        },
        {
            special: "about"
        }
    ]

    return (
        <div className="about content">
            <Banner />
            <Side contents={sides}/>
            <div className="about-main">
                <h3>About slashdave.com</h3>
                <img src={portrait} alt="portrait" />
                <p>Welcome to my small corner of the internet.</p>
                <p>
                    I established slashdave (<span className="monospace">/dave</span>) in 2011 as my personal presence on the web, to present my <Link to="/resume">credentials</Link> and express my identity. It also serves as a permanent place to store my electronic documents, as a personal code repository, and a place to experiment with the latest trends in computer technology.
                </p>
                <p>
                    This web site is my own design and implementation. In its current incarnation, the frontend is implemented in <a href="https://reactjs.org/">React</a>, the backend runs on <a href="https://nodejs.org/en/">Node.js</a>, and data is stored in <a href="https://www.mongodb.com/">MongoDB</a>. The backend is deployed in <a href="https://aws.amazon.com/elasticbeanstalk/">Elastic Beanstalk</a> on <a href="https://aws.amazon.com/">AWS</a> and the database is currently maintained on the cloud by <a href="https://www.mongodb.com/cloud/atlas">MongoDB atlas</a>.
                </p>
            </div>
        </div>
    )
}

        
export default About;