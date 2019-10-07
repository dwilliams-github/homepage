import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';
import { Icon, Spinner, Dialog, Button, AnchorButton, InputGroup } from "@blueprintjs/core";
import axios from 'axios';
import '@blueprintjs/table/lib/css/table.css'

class Venue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            adding: false,
            removing: null,
            venues: []
        }

        // Place to store form data for addition
        // (there is no reason to use the state for this purpose)
        this.add = {}
    }

    componentDidMount() {
        axios.get("http://localhost:8000/venues/get")
        .then( (res) => {
            if (!res.data.success) throw res.error;
            this.setState({
                venues: res.data.data
            });
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    addOnChange(name,event) {
        this.add[name] = event.target.value;
    }

    submitAdd() {
        axios.get("http://localhost:8000/venues/add", {
            params: this.add
        })
        .then( (res) => {
            if (!res.data.success) throw res.error;
            this.setState({
                venues: [
                    ...this.state.venues,
                    res.data.data
                ],
                adding: false
            });
        })
        .catch( (err) => {
            console.log(err);
        });
    }
    
    submitRemove() {
        axios.get("http://localhost:8000/venues/remove", {
            params: { id: this.state.removing }
        })
        .then( (res) => {
            if (!res.data.success) throw res.error;
            this.setState({
                venues: this.state.venues.filter( r => r._id != this.state.removing ),
                removing: null
            });
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    cancelAdd() {
        this.setState({adding: false});
    }

    cancelRemove() {
        this.setState({removing: null});
    }

    cellActions(col,row) {
        if (col.key != '_id') return;

        return [
            {
                icon: <Icon icon="add"/>,
                callback: () => this.setState({adding: true})
            },
            {
                icon: <Icon icon="remove" intent="warning"/>,
                callback: () => this.setState({removing: row._id})
            }
        ]
    }

    sortRow( col, dir ) {
        switch(dir) {
            case 'ASC':
                this.setState({
                    venues: this.state.venues.sort( (a,b) => a[col] > b[col] ? 1 : -1 )
                })
                break;
            case 'DESC':
                this.setState({
                    venues: this.state.venues.sort( (a,b) => a[col] < b[col] ? 1 : -1 )
                })
                break;
        }
    }

    updateRow( {fromRow, toRow, updated} ) {
        //
        // Update mongo
        //
        for( let i=fromRow; i<=toRow; i++ ) {
            axios.get("http://localhost:8000/venues/update", {
                params: {
                    id: this.state.venues[i]._id,
                    values: updated
                }
            })
            .then( (res) => {
                if (!res.data.success) throw res.error;
            })
            .catch( (err) => {
                console.log(err);
            });
        }

        //
        // Update state independently
        //
        let newStuff = [];
        for( let i=fromRow; i<=toRow; i++ ) {
            newStuff.push({
                ...this.state.venues[i],
                ...updated
            });
        }
        this.setState({
            venues: [
                ...this.state.venues.slice(0,fromRow),
                ...newStuff,
                ...this.state.venues.slice(toRow+1)
            ]
        })
    }

    render() {
        const { adding, removing, venues } = this.state;

        if (venues.length == 0) return <Spinner/>;

        const columns = [
            {
                key: '_id', 
                name: 'Id' ,
                sortable: true
            },
            { 
                key: 'name',
                name: 'Name',
                resizable: true,
                sortable: true,
                editable: true
            },
            {
                key: 'address',
                name: 'Address',
                resizable: true,
                sortable: true
            },
            {
                key: 'url',
                name: 'URL',
                resizable: true,
                sortable: true
            }
        ];

        return (
            <div style={{position: 'relative'}}>
                <div style={{position: 'absolute', width: '100%'}}>
                    <Dialog title="Add Venue" isOpen={adding} onClose={() => this.cancelAdd()}>
                        <div className="dialog">
                            <InputGroup
                                placeholder="Name"
                                onChange={(e) => this.addOnChange("name",e)}
                            />
                            <InputGroup
                                placeholder="Address"
                                onChange={(e) => this.addOnChange("address",e)}
                            />
                            <InputGroup
                                placeholder="URL"
                                onChange={(e) => this.addOnChange("url",e)}
                            />
                            <div className="buttons">
                                <Button icon="undo" text="Cancel" onClick={() => this.cancelAdd()}/>
                                <AnchorButton icon="add" text="Add" onClick={() => this.submitAdd()}/>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog title="Confirm removal" isOpen={removing} onClose={() => this.cancelRemove()}>
                        <div className="dialog">
                            <div>Are you sure?</div>
                            <div className="buttons">
                                <Button icon="undo" text="Cancel" onClick={() => this.cancelRemove()}/>
                                <AnchorButton icon="remove" text="Remove" onClick={() => this.submitRemove()}/>
                            </div>
                        </div>
                    </Dialog>
                    <ReactDataGrid
                        columns={columns}
                        rowGetter={i => venues[i]}
                        rowsCount={venues.length}
                        onGridSort={(c,d) => this.sortRow(c,d)}
                        onGridRowsUpdated={r => this.updateRow(r)}
                        enableCellSelect={true}
                        getCellActions={(r,c) => this.cellActions(r,c)}
                    />
                </div>
            </div>
        )    
    }
}


export default Venue;