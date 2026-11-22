import React from 'react';
import Banner from './Banner';
import Side from './Side';
import Markdown from 'react-markdown';
import rehypeSlug from "rehype-slug";
import resume from './text/resume.md?raw';
import './css/resume.css';

function Resume() {
    const sides = [
        {
            title: 'Contents',
            items: [
                <a href="#knowledge-and-skills">Knowledge and Skills</a>,
                <a href="#professional-experience">Professional Experience</a>,
                <a href="#education">Education</a>,
                <a href="#computer-experience">Computer Experience</a>,
                <a href="#selected-publications-and-patents">Selected Publications and Patents</a>
            ]
        },
        {
            title: "Personal Projects",
            items: [
                <a href="https://github.com/dwilliams-github" target="_blank">GitHub</a>
            ]
        },
        {
            title: "Academic Links",
            items: [
                <a href="https://orcid.org/0000-0002-4123-9339" target="_blank">
                    Journal Publications (ORCID)
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
        <div className="resume content">
            <Banner />
            <div id="address">
                E-mail: <a href="mailto:dwilliams@slashdave.com">dwilliams@slashdave.com</a><br/>
                Web: <a href="https://slashdave.com/">https://slashdave.com/</a>
            </div>
            <Side contents={sides}/>
            <div className="content">
                <Markdown children={resume} rehypePlugins={[[rehypeSlug,{}]]}/>
            </div>
        </div>
    )
}

export default Resume;