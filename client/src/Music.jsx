import React from 'react';
import Banner from './Banner';
import Side from './Side';
import axios from 'axios';
import './css/styles-site.css';
import './css/music.css';

class Music extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gigs: []
        }
    }

    componentDidMount() {
        axios.get("/api/music/get")
        .then( (res) => {
            if (!res.data.success) throw res.error;
            this.setState({
                gigs: res.data.data.map( g => ({...g, start_msec: Date.parse(g.start_date)}) )
            });
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    render() {
        const { gigs } = this.state;

        let contents = [
            {
                url: "#groups",
                name: "Groups"
            },
            {
                url: "#shows",
                name: "Shows"
            }
        ]

        let sides = [
            {
                url: "http://www.trumpetguild.org/",
                object: (
                    <span>Internation Trumpet Guild</span>
                )
            },
            {
                url: "http://www.trumpetherald.com/",
                object: (
                    <span>The Trumpet Herald</span>
                )
            }
        ];

        return (
            <div className="music content">
                <Banner />
                <div id="bannercaption">Music</div>
                <Side sides={sides} contents={contents}/>
                <h3><a name="groups">Groups</a></h3>
                <p>Here are the musical groups that I am most active with lately</p>
                <ul>
                    <li><a href="http://newarksymphonic.org/">Newark Symphonic Winds</a>, a community-based concert band</li>
                    <li>Brass Menagerie, a brass quintet</li>
                    <li><a href="http://www.stage1theatre.org/Stage_1_Theatre/Home.html">Stage 1 Theatre</a>, a community-based theatre group</li>
                </ul>
                <h3><a name="shows">Shows</a></h3>
                <p>Here is a list of the shows I have been involved with. There is a bit of history to go through here, so I apologize in advance if I got any details wrong, or missed a show.</p>
                {gigs.sort( (a,b) => b.start_msec - a.start_msec ).map( d => (
                    <div className="show" key={d._id}>
                        <div className="title">{d.title}</div>
                        <div className="author">{d.authors}</div>
                        <div className="pres">
                            Presented by {urlOrNot(d.group)}, music director {urlOrNot(d.director)}
                        </div>
                        <div className="venue">{urlOrNot(d.venue)}</div>
                        <div className="dates">
                            {timeStampToDate(d.start_date)} to {timeStampToDate(d.end_date)}
                        </div>
                        <div className="pos">{d.position}</div>
                    </div>
                ))}
            </div>
        )
    }
}


function timeStampToDate(ts) {
    return new Date(ts).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' } );
}


function urlOrNot(o) {
    return o.url ? <a href={o.url}>{o.name}</a> : <span>{o.name}</span>;
}

        
export default Music;