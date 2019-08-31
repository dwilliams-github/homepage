import React from 'react';
import Banner from './Banner';
import Side from './Side';
import Markdown from 'react-markdown';
import queryString from 'query-string';
import resume from './text/resume.txt';
import './css/resume';

class Resume extends React.Component {
    render() {
        const sides = [
            {
                title: 'Contents',
                items: [
                    <a href="#skills">Knowledge and Skills</a>,
                    <a href="#education">Education</a>,
                    <a href="#computer">Computer Experience</a>,
                    <a href="#experience">Professional Experience</a>
                ]
            },
            {
                title: "Academic Links",
                items: [
                    <a href={"https://inspirehep.net/search?" + queryString.stringify({
                        p: "FIND AUTHOR D C WILLIAMS AND (J PRLTA OR J PHRVA OR J PHLTA OR J ZEPYA OR J EPHJA OR J NUIMA)"
                    })}>
                        My Journal Publications (SPIRES)
                    </a>,
                    <a href="/public/documents/cv.pdf">
                        Curriculum Vitae (out of date)
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
                    E-mail: <a href="mailto:david.c.williams@mac.com">david.c.williams@mac.com</a><br/>
                    Web: <a href="http://slashdave.com/">http://slashdave.com/</a>
                </div>
                <Side sides={sides} contents={sides}/>
                <div className="content">
                    <Markdown source={resume} />
                </div>
            </div>
        )
    }
}

export default Resume;