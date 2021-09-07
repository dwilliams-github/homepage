import React from 'react';
import Banner from './Banner';
import Side from './Side';
import Markdown from 'react-markdown';
import queryString from 'query-string';
import resume from './text/resume.md';
import './css/resume';

function Resume() {
    const sides = [
        {
            title: 'Contents',
            items: [
                <a href="#skills">Knowledge and Skills</a>,
                <a href="#experience">Professional Experience</a>,
                <a href="#education">Education</a>,
                <a href="#computer">Computer Experience</a>,
                <a href="#publications">Selected Publications and Patents</a>
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
                <Markdown children={resume} linkTarget="_blank" />
            </div>
        </div>
    )
}

export default Resume;