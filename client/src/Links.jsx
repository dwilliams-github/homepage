import React from 'react';
import { Helmet } from "react-helmet";
import Banner from './Banner';
import Side from './Side';
import { HashLink } from "react-router-hash-link";
import rehypeSlug from "rehype-slug";
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';
import links from './text/links.md'
import './css/links';

function Links() {
    const sides = [
        {
            title: 'Contents',
            items: [
                <HashLink to="#mathematics-and-algorithms">Mathematics and Algorithms</HashLink>,
                <HashLink to="#biotech-news">Biotech News</HashLink>,
                <HashLink to="#computing-news">Computing News</HashLink>,
                <HashLink to="#physics-news">Physics News</HashLink>,
                <HashLink to="#space-news">Space News</HashLink>,
                <HashLink to="#programming">Programming</HashLink>,
                <HashLink to='#comics'>Comics</HashLink>,
                <HashLink to="#writing">Writing</HashLink>
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
                <Markdown children={links} remarkPlugins={[gfm]} rehypePlugins={[[rehypeSlug,{}]]} linkTarget="_blank"/>
            </div>
        </div>
    )
}

export default Links;