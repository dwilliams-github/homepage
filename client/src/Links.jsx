import React from 'react';
import { Helmet } from "react-helmet";
import Banner from './Banner';
import Side from './Side';
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';
import links from './text/links.md'
import './css/links';

function Links() {
    const sides = [
        {
            title: 'Contents',
            items: [
                <a href="#math">Mathematics and Algorithms</a>,
                <a href="#biotech">Biotech News</a>,
                <a href="#computing">Computing News</a>,
                <a href="#physics">Physics News</a>,
                <a href="#space">Space News</a>,
                <a href="#programming">Programming</a>,
                <a href='#comics'>Comics</a>,
                <a href="#writing">Writing</a>
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
        <div className="content">
            <Helmet>
                <title>David C. Williams, Ph.D.</title>
                <meta name="description" content="A few links I have found useful or interesting"/>
                <link rel="canonical" href="https://slashdave.com/links"/>
            </Helmet>
            <Banner />
            <div id="bannercaption">A few links I have found useful or interesting</div>
            <Side contents={sides}/>
            <div className="links-content">
                <Markdown children={links} remarkPlugins={[gfm]} linkTarget="_blank"/>
            </div>
        </div>
    )
}

export default Links;