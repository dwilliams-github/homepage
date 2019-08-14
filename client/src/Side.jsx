import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Side extends React.Component {
    render() {
        return (
            <div id="side">
                <div className="sidetitle">
                    Site
                </div>
                <div className="sideitem">
                    <div><Link to="/">Home</Link></div>
                    <div><Link to="/blog">Blog</Link></div>
                    <div><Link to="/projects">Projects</Link></div>
                    <div><Link to="/music">Music</Link></div>
                    <div><Link to="/links">Links</Link></div>
                </div>
                <div className="sidetitle">
                    Links
                </div>
                <div className="sideitem">
                    {this.props.sides.map( s => (
                        <div><a href={s.url}>{s.object}</a></div>
                    ))}
                </div>
                <div className="sidetitle">
                    About
                </div>
                <div className="sideitem">
                    <div><Link to="/terms">Terms of use</Link></div>
                    <div><a href="admin@slashdave.com">Contact us</a></div>
                    <div className="copyright">© Copyright 2019 David C. Williams</div>
                </div>
            </div>
        )
    }
}

export default Side;