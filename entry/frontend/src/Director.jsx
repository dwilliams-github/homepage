import React, {Component} from 'react'
import ReactDataGrid from 'react-data-grid'
import axios from 'axios'
import '@blueprintjs/table/lib/css/table.css'

class Director extends Component {
    constructor(props) {
        super(props);

        this.state = {
            directors: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8000/directors/get")
        .then( (res) => {
            if (!res.data.success) throw res.error;
            this.setState({
                directors: res.data.data
            });
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    render() {
        const { directors } = this.state;

        const columns = [
            {
                key: '_id', 
                name: 'Id' 
            },
            { 
                key: 'name',
                name: 'Name',
                resizable: true
            },
            {
                key: 'email',
                name: 'Email',
                resizable: true
            },
            {
                key: 'url',
                name: 'URL',
                resizable: true
            }
        ];

        return (
            <div>
                <ReactDataGrid
                    columns={columns}
                    rowGetter={i => directors[i]}
                    rowsCount={directors.length}
                />
            </div>
        )    
    }
}

export default Director;