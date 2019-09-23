import React, {Component} from 'react';
import { Cell, Column, Table } from "@blueprintjs/table";
import axios from 'axios';
import '@blueprintjs/table/lib/css/table.css'

class Gig extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gigs: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8000/gigs/get")
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

        return (
            <div>
                <Table numRows={gigs.length}>
                    <Column name="Id" cellRenderer={(i) => (
                        <Cell>{gigs[i]._id}</Cell>
                    )}/>
                    <Column name="Title" cellRenderer={(i) => (
                        <Cell>{gigs[i].title}</Cell>
                    )}/>
                    <Column name="Group" cellRenderer={(i) => (
                        <Cell>{gigs[i].group.name}</Cell>
                    )}/>
                    <Column name="Director" cellRenderer={(i) => (
                        <Cell>{gigs[i].director.name}</Cell>
                    )}/>
                    <Column name="Venue" cellRenderer={(i) => (
                        <Cell>{gigs[i].venue.name}</Cell>
                    )}/>
                    <Column name="Start Date" cellRenderer={(i) => (
                        <Cell>{timeStampToDate(gigs[i].start_date)}</Cell>
                    )}/>
                    <Column name="End Date" cellRenderer={(i) => (
                        <Cell>{timeStampToDate(gigs[i].end_date)}</Cell>
                    )}/>
                </Table>
            </div>
        )
    }
}

function timeStampToDate(ts) {
    return new Date(ts).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' } );
}

export default Gig;