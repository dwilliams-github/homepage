import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Side extends React.Component {
    render() {
        const contents = this.props.contents || [{special:"site"},{special:"about"}];

        return (
            <div id="side">
                {contents.map( (c,index) => {
                    if (c.special == "site") return siteStuff;
                    if (c.special == "about") return aboutStuff;

                    let answer = [];
                    if (c.title) {
                        answer.push(<div className="sidetitle" key={"sideT"+index}>{c.title}</div>)
                    }
                    answer.push(
                        <div className="sideitem" key={"sideI"+index}>
                            {c.items.map( (i,i2) => (
                                <div key={"sideT"+index+"_"+i2}>{i}</div>
                            ))}
                        </div>
                    )

                    return answer;
                })}
           </div>
        )
    }
}

const siteStuff = [
    <div className="sidetitle" key="sideTsite">
        Site
    </div>,
    <div className="sideitem" key="sideIsite">
        <div><Link to="/">Home</Link></div>
        <div><Link to="/blog">Blog</Link></div>
        <div><Link to="/projects">Projects</Link></div>
        <div><Link to="/music">Music</Link></div>
        <div><Link to="/links">Links</Link></div>
    </div>    
]

const aboutStuff = [
    <div className="sidetitle" key="sideTabout">
        slashdave.com
    </div>,
    <div className="sideitem" key="sideIabout">
        <div><Link to="/about">About</Link></div>
        <div><Link to="/terms">Terms of use</Link></div>
        <div className="copyright">© Copyright 2019 David C. Williams</div>
    </div>
]

export default Side;