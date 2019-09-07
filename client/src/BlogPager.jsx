import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

class BlogPager extends React.Component {
    render() {
        const {page, isMore, linkProps} = this.props;

        const ipage = page ? parseInt(page) : 0;

        let controls = [];
        if (page) {
            controls.push(
                <div className="newer" key="newer">
                    <Link to={"/blog?" + queryString.stringify({
                        ...linkProps,
                        page: ipage-1
                    })}>Newer posts →</Link>
                </div>
            );
        }
        if (isMore) {
            controls.push(
                <div className="older" key="older">
                    <Link to={"/blog?" + queryString.stringify({
                        ...linkProps,
                        page: ipage+1
                    })}>← Older posts</Link>
                </div>
            );
        }

        return controls;
    }
}

export default BlogPager;
