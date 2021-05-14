import React from 'react';
import Banner from './Banner';
import Side from './Side';
import Markdown from 'react-markdown';
import terms from './text/terms.md'
import './css/terms';

class Terms extends React.Component {
    render() {
        const sides = [
            {
                special: "site"
            },
            {
                special: "about"
            }
        ];

        return (
            <div className="terms content">
                <Banner />
                <div id="bannercaption">Terms of Use</div>
                <Side contents={sides}/>
                <div className="content">
                    <Markdown children={terms} />
                </div>
            </div>
        )
    }
}

export default Terms;