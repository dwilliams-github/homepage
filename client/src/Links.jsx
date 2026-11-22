import React from 'react';
import Banner from './Banner';
import Side from './Side';
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';
import links from './text/links.md?raw'
import './css/links.css';

export const Head = () => {
    return (
        <>
            <title>David C. Williams, Ph.D.</title>
            <meta name="description" content="A few links I have found useful or interesting"/>
            <link rel="canonical" href="https://slashdave.com/links"/>
        </>
    )
}

function Links() {
    const sides = [
        {
            title: 'Contents',
            items: [
                <a href="#mathematics-and-algorithms">Mathematics and Algorithms</a>,
                <a href="#biotech-news">Biotech News</a>,
                <a href="#computing-news">Computing News</a>,
                <a href="#physics-news">Physics News</a>,
                <a href="#space-news">Space News</a>,
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
            <Head />
            <Banner />
            <div id="bannercaption">A few links I have found useful or interesting</div>
            <Side contents={sides}/>
            <div className="links-content">
                <Markdown children={links} remarkPlugins={[gfm]} rehypePlugins={[[rehypeSlug,{}], [rehypeExternalLinks, {target: "_blank"}]]} />
            </div>
        </div>
    )
}

export default Links;