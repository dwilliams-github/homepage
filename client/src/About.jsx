import React, { Component } from 'react';
import Banner from './Banner';
import Side from './Side';
import { Link } from "react-router-dom";
import './css/styles-site.css';
import './css/about.css';
import portrait from './images/portrait.jpg';
import react from './images/react.svg';
import webfaction from './images/webfaction-110x40-white-logo.png';
import godaddy from './images/godaddy.png';
import mongodb from './images/mongodb.svg';
import nodejs from './images/nodejs.svg';

class About extends React.Component {
    render() {

        let sides = [
            {
                url: "https://reactjs.org/",
                object: (
                    <img 
                        style={{width: 25, marginTop: 3}} 
                        src={react} 
                        alt="Webfaction" 
                    />
                )
            },
            {
                url: "http://www.webfaction.com/",
                object: (
                    <img 
                        src={webfaction} 
                        alt="Webfaction" 
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

        return (
            <div className="about content">
                <Banner />
                <Side sides={sides}/>
                <div id="main">
                    <h3>About slashdave.com</h3>
                    <img src={portrait} height={279} alt="portrait" />
                    <p>Welcome to my small corner of the internet.</p>
                    <p>
                        I established slashdave (<span class="monospace">/dave</span>) in 2011 as my personal presence on the web, to present my <Link to="resume.html">credentials</Link> and express my identity. It also serves as a permanent place to store my electronic documents, as a personal code repository, and a place to experiment with the latest trends in computer technology.
                    </p>
                    <p>
                        This web site is my own design and implementation. In its current incarnation, the frontend is implemented in <a href="https://reactjs.org/">React</a>, the backend runs on <a href="https://nodejs.org/en/">node.js</a>, and data is stored in <a href="https://www.mongodb.com/">MongoDB</a>. The backend is hosted by <a href="http://www.webfaction.com/">WebFaction</a> on a <a href="http://www.centos.org/">CentOS 7 linux</a> platform and the database is currently maintained on the cloud by <a href="https://www.mongodb.com/cloud/atlas">MongoDB atlas</a>.
                    </p>
                </div>
            </div>
        )
    }
}

        
export default About;