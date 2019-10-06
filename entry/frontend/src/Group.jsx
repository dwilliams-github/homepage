import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid'
import axios from 'axios';
import '@blueprintjs/table/lib/css/table.css'
import { GROUPED_BAR_CHART } from '@blueprintjs/icons/lib/esm/generated/iconContents';

class Gig extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: []
        }
    }



    render() {
        const { groups } = this.state;

        return (
            <div>
                <div style={{width:'100%', background: 'blue'}}>xx</div>
                <div>Hello?</div>
            </div>
        );
    }
}

function timeStampToDate(ts) {
    return new Date(ts).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' } );
}

export default Gig;