import React from 'react';
import Banner from './Banner';
import { Link } from "react-router-dom";
import { FaQuestion, FaQuoteRight, FaHammer, FaMusic, FaLink } from 'react-icons/fa';
import './css/landing.css';

export const Head = () => {
    return (
        <>
            <title>David C. Williams, Ph.D.</title>
            <meta name="description" content="Home page"/>
            <link rel="canonical" href="https://slashdave.com/"/>
        </>
    )
}

function Landing() {
    return (
        <div className="landing">
            <Head />
            <div className="menu">
                <Banner />
                <div className="frame">
                    <div className="item">
                        <Link to="/about">
                            <div className="icon"><FaQuestion /></div>
                            <div className="link">About</div>
                        </Link>
                    </div>
                    <div className="item right">
                        <Link to="/blog">
                            <div className="icon"><FaQuoteRight /></div>
                            <div className="link">Blog</div>
                        </Link>
                    </div>
                    <div className="item right">
                        <Link to="/projects">
                            <div className="icon"><FaHammer /></div>
                            <div className="link">Projects</div>
                        </Link>
                    </div>
                    <div className="item right">
                        <Link to="/music">
                            <div className="icon"><FaMusic /></div>
                            <div className="link">Music</div>
                        </Link>
                    </div>
                    <div className="item right">
                        <Link to="/links">
                            <div className="icon"><FaLink /></div>
                            <div className="link">Links</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;