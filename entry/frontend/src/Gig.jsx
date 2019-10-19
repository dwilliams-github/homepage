import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';
import { Icon, Spinner, Dialog, Button, AnchorButton, InputGroup, HTMLSelect } from "@blueprintjs/core";
import { DateRangePicker } from "@blueprintjs/datetime";
import DateEditor from './DateEditor';
import DropDownEditor from './DropDownEditor';
import axios from 'axios';
import '@blueprintjs/table/lib/css/table.css'

class Gig extends Component {
    constructor(props) {
        super(props);

        this.state = {
            adding: false,
            removing: null,
            gigs: [],
            groups: null,
            directors: null,
            venues: null
        }

        // Place to store form data for addition
        // (there is no reason to use the state for this purpose)
        this.add = {}
    }

    componentDidMount() {
        axios.get("http://localhost:8000/gigs/get")
        .then( (res) => {
            if (!res.data.success) throw res.error;
            this.setState({
                gigs: res.data.data
            });
        })
        .catch( (err) => {
            console.log(err);
        });

        //
        // Fetch other objects separately. This is a little lazy,
        // since we could add these to "/gigs/get", but performance
        // shouldn't be a limiting concern for a local get.
        //
        axios.get("http://localhost:8000/venues/get")
        .then( (res) => {
            if (!res.data.success) throw res.error;
            this.setState({
                venues: res.data.data.reduce( (t,v) => {t[v._id] = v.name; return t;}, {} )
            });
        })
        .catch( (err) => {
            console.log(err);
        });

        axios.get("http://localhost:8000/directors/get")
        .then( (res) => {
            if (!res.data.success) throw res.error;
            this.setState({
                directors: res.data.data.reduce( (t,v) => {t[v._id] = v.name; return t;}, {} )
            });
        })
        .catch( (err) => {
            console.log(err);
        });

        axios.get("http://localhost:8000/groups/get")
        .then( (res) => {
            if (!res.data.success) throw res.error;
            this.setState({
                groups: res.data.data.reduce( (t,v) => {t[v._id] = v.name; return t;}, {} )
            });
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    addOnChange(name,event) {
        this.add[name] = event.target.value;
    }

    dateChange(range) {
        this.add = {
            ...this.add,
            start_date: range[0] ? range[0].toISOString() : undefined,
            end_date: range[1] ? range[1].toISOString() : undefined
        }
    }

    submitAdd() {
        axios.get("http://localhost:8000/gigs/add", {
            params: this.add
        })
        .then( (res) => {
            if (!res.data.success) throw res.error;
            this.setState({
                gigs: [
                    ...this.state.gigs,
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
        axios.get("http://localhost:8000/gigs/remove", {
            params: { id: this.state.removing }
        })
        .then( (res) => {
            if (!res.data.success) throw res.error;
            this.setState({
                gigs: this.state.gigs.filter( r => r._id != this.state.removing ),
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
                    gigs: this.state.gigs.sort( (a,b) => a[col] > b[col] ? 1 : -1 )
                })
                break;
            case 'DESC':
                this.setState({
                    gigs: this.state.gigs.sort( (a,b) => a[col] < b[col] ? 1 : -1 )
                })
                break;
        }
    }

    updateRow( {fromRow, toRow, updated} ) {
        //
        // Update mongo
        //
        for( let i=fromRow; i<=toRow; i++ ) {
            axios.get("http://localhost:8000/gigs/update", {
                params: {
                    id: this.state.gigs[i]._id,
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
                ...this.state.gigs[i],
                ...updated
            });
        }
        this.setState({
            gigs: [
                ...this.state.gigs.slice(0,fromRow),
                ...newStuff,
                ...this.state.gigs.slice(toRow+1)
            ]
        })
    }

    render() {
        const { adding, removing, gigs, groups, directors, venues } = this.state;

        if (!(gigs.length && venues && directors && groups) ) return <Spinner/>;

        

        const columns = [
            {
                key: '_id', 
                name: 'Id' ,
                sortable: true
            },
            { 
                key: 'title',
                name: 'Title',
                resizable: true,
                sortable: true,
                editable: true
            },
            { 
                key: 'authors',
                name: 'Authors',
                resizable: true,
                sortable: true,
                editable: true
            },
            {
                key: 'start_date',
                name: 'Start Date',
                resizable: true,
                sortable: true,
                formatter: d => timeStampToDate(d.value),
                editor: <DateEditor />
            },
            {
                key: 'end_date',
                name: 'End Date',
                resizable: true,
                sortable: true,
                formatter: d => timeStampToDate(d.value),
                editor: <DateEditor />
            },
            {
                key: 'position',
                name: 'Position',
                resizable: true,
                sortable: true,
                editable: true
            },
            { 
                key: 'group',
                name: 'Group',
                resizable: true,
                sortable: true,
                editable: true,
                formatter: d => d.value ? groups[d.value] : "ERROR",
                editor: <DropDownEditor options={dropdownOptions(groups)} />
            },
            { 
                key: 'director',
                name: 'Director',
                resizable: true,
                sortable: true,
                editable: true,
                formatter: d => d.value ? directors[d.value] : "ERROR",
                editor: <DropDownEditor options={dropdownOptions(directors)} />
            },
            { 
                key: 'venue',
                name: 'Venue',
                resizable: true,
                sortable: true,
                editable: true,
                formatter: d => d.value ? venues[d.value] : "ERROR",
                editor: <DropDownEditor options={dropdownOptions(venues)} />
            }
        ];

        return (
            <div style={{position: 'relative'}}>
                <div style={{position: 'absolute', width: '100%'}}>
                    <Dialog title="Add Gig" isOpen={adding} onClose={() => this.cancelAdd()}>
                        <div className="dialog">
                            <InputGroup
                                placeholder="Title"
                                onChange={(e) => this.addOnChange("title",e)}
                            />
                            <InputGroup
                                placeholder="Authors"
                                onChange={(e) => this.addOnChange("authors",e)}
                            />
                            <DateRangePicker
                                shortcuts={false}
                                onChange={(r) => this.dateChange(r)}
                            />
                            <InputGroup
                                placeholder="Position"
                                onChange={(e) => this.addOnChange("position",e)}
                            />
                            <HTMLSelect defaultValue="none" onChange={(e) => this.addOnChange("group",e)}>
                                <option value="none" disabled>Select group...</option>
                                {Object.entries(groups).sort((a,b) => a[1] > b[1] ? 1 : -1).map( ([k,v]) => (
                                    <option value={k} key={k}>{v}</option>
                                ))}
                            </HTMLSelect>
                            <HTMLSelect defaultValue="none" onChange={(e) => this.addOnChange("director",e)}>
                                <option value="none" disabled>Select director...</option>
                                {Object.entries(directors).sort((a,b) => a[1] > b[1] ? 1 : -1).map( ([k,v]) => (
                                    <option value={k} key={k}>{v}</option>
                                ))}
                            </HTMLSelect>
                            <HTMLSelect defaultValue="none" onChange={(e) => this.addOnChange("venue",e)}>
                                <option value="none" disabled>Select venue...</option>
                                {Object.entries(venues).sort((a,b) => a[1] > b[1] ? 1 : -1).map( ([k,v]) => (
                                    <option value={k} key={k}>{v}</option>
                                ))}
                            </HTMLSelect>
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
                        rowGetter={i => gigs[i]}
                        rowsCount={gigs.length}
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


//
// Convert object dictionary to sorted array.
//
const dropdownOptions = (f) => 
    Object.entries(f).map(([k,v]) => ({value: k, text: v}))
        .sort( (a,b) => a.text < b.text ? -1 : 1);

function timeStampToDate(ts) {
    return new Date(ts).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' } );
}

export default Gig;