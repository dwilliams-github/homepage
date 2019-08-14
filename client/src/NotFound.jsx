import React, { Component } from 'react';
import './css/404.css';
import cookie from './images/cookie.png';

class NotFound extends React.Component {
    render() {
        return (
            <div className="notfound">
				<div className="big">!</div>
				<div className="content">
					<div class="head">
						<span class="value">404</span> Not Found
						<div class="label">slashdave.com</div>
					</div>
					<div class="desc">
						<p>The page you have requested does not exist.</p>
						<p>My advice:</p>
						<ul>
							<li>Don't panic!</li>
							<li>Have a cookie. If you don't have any cookies within reach, run now and get some!</li>
							<li>If this link was provided by a 3rd party, maybe you can reach them and offer a cookie. Everyone likes cookies.</li>
							<li>Try starting again at the <a href="/">home page</a> and hope for the best.</li>
							<li>If all else fails, send an <a href="mailto:admin@slashdave.com">e-mail</a> and complain.</li>
						</ul>
					</div>
					<img class="cookie" src={cookie} title="Yummy!" />
				</div>
			</div>
        )
    }
}

export default NotFound;