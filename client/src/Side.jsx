import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Side extends React.Component {
    render() {
        return (
            <div id="side">
                {this.props.contents ? <div className="sidetitle">Contents</div> : null }
                {this.props.contents ?
                    <div className="sideitem">
                        {this.props.contents.map( c => (
                            <div><a href={c.url}>{c.name}</a></div>
                        ))}
                    </div> : null
                }
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
                        <div key={s.url}><a href={s.url}>{s.object}</a></div>
                    ))}
                </div>
                <div className="sidetitle">
                    About
                </div>
                <div className="sideitem">
                    <div><Link to="/terms">Terms of use</Link></div>
                    <div><a href="admin@slashdave.com">Contact</a></div>
                    <div className="copyright">© Copyright 2019 David C. Williams</div>
                </div>
            </div>
        )
    }
}

export default Side;