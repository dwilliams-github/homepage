import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid'
import axios from 'axios';
import '@blueprintjs/table/lib/css/table.css'
import { GROUPED_BAR_CHART } from '@blueprintjs/icons/lib/esm/generated/iconContents';

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

        function huh(h) {
            return <div>{h.name}</div>
        }

        const columns = [
            {
                key: '_id', 
                name: 'Id' 
            },
            { 
                key: 'title',
                name: 'Title',
                resizable: true
            },
            {
                key: 'group',
                name: 'Group',
                resizable: true,
                formatter: g => <div>{g.value.name}</div>
            },
            {
                key: 'directory',
                name: 'Director',
                resizable: true,
                formatter: d => <div>{d.value.name}</div>
            },
            {
                key: 'venue',
                name: 'Venue',
                resizable: true,
                formatter: v => <div>{v.value.name}</div>
            },
            {
                key: 'start_date',
                name: 'Start Date',
                resizable: true,
                formatter: d => timeStampToDate(d.value)
            },
            {
                key: 'end_date',
                name: 'End Date',
                resizable: true,
                formatter: d => timeStampToDate(d.value)
            }
        ];

        return (
            <div>
                <ReactDataGrid
                    columns={columns}
                    rowGetter={i => gigs[i]}
                    rowsCount={gigs.length}
                />
            </div>
        )    
    }
}

function timeStampToDate(ts) {
    return new Date(ts).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' } );
}

export default Gig;