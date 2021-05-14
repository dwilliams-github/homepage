import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';
import {
    Icon,
    Spinner,
    Dialog,
    Button,
    AnchorButton,
    Collapse,
    TextArea,
    InputGroup,
    Checkbox,
    FileInput
} from "@blueprintjs/core";
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';
import axios from 'axios';
import '@blueprintjs/table/lib/css/table.css'

class Blog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            adding: null,
            addBody: null,
            editing: null,
            editBody: null,
            removing: null,
            removeImage: null,
            addImage: null,
            blogs: [],
            cats: []
        }

        // Place to store form data for addition
        // (there is no reason to use the state for this purpose)
        this.add = {
            categories: []
        }

        this.edit = {
            title: "",
            categories: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8000/blogs/get")
        .then( (res) => {
            if (!res.data.success) throw res.error;
            this.setState({
                blogs: res.data.data
            });
        })
        .catch( (err) => {
            console.log(err);
        });

        axios.get("http://localhost:8000/blogs/cats")
        .then( (res) => {
            if (!res.data.success) throw res.error;
            this.setState({
                cats: res.data.data
            });
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    
    submitRemove() {
        axios.get("http://localhost:8000/blogs/remove", {
            params: { id: this.state.removing }
        })
        .then( (res) => {
            if (!res.data.success) throw res.error;
            this.setState({
                blogs: this.state.blogs.filter( r => r._id != this.state.removing ),
                removing: null
            });
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    addOnChange(name,event) {
        this.add[name] = event.target.value;
    }

    addCategory(event,cid) {
        if (event.currentTarget.checked) {
            this.add.categories.push(cid);
        } else {
            this.add.categories = this.add.categories.filter( i => i != cid);
        }
        return true;
    }

    addBodyChange(event) {
        this.setState({
            addBody:  event.target.value
        });
    }

    cancelAdd() {
        this.setState({adding: false});
    }

    submitAdd() {
        let params = this.add;
        params.body = this.state.addBody;
        params.created = (new Date()).toISOString();

        axios.get("http://localhost:8000/blogs/add", {
            params: params
        })
        .then( (res) => {
            if (!res.data.success) throw res.error;
            this.setState({
                gigs: [
                    ...this.state.blogs,
                    res.data.data
                ],
                adding: false,
                addBody: null
            });
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    cancelRemove() {
        this.setState({removing: null});
    }

    beginEdit(row) {
        this.edit = {
            title: row.title,
            categories: row.categories
        }
        this.setState({
            editBody: row.body,
            editing: row._id
        })
    }

    editOnChange(name,event) {
        this.edit[name] = event.target.value;
    }

    editCategory(event,cid) {
        if (event.currentTarget.checked) {
            this.edit.categories.push(cid);
        } else {
            this.edit.categories = this.add.categories.filter( i => i != cid);
        }
        return true;
    }

    editBodyChange(event) {
        this.setState({
            editBody:  event.target.value
        });
    }

    cancelEdit() {
        this.setState({editing: null});
    }

    submitEdit() {
        //
        // Update mongo
        //
        let updated = this.edit;
        updated.body = this.state.editBody;
        updated.modified = (new Date()).toISOString();

        axios.get("http://localhost:8000/blogs/update", {
            params: {
                id: this.state.editing,
                values: updated
            }
        })
        .then( (res) => {
            if (!res.data.success) throw res.error;
        })
        .catch( (err) => {
            console.log(err);
        });

        //
        // Update state independently
        //
        let replaced = this.state.blogs.findIndex(r => r._id == this.state.editing);

        this.setState({
            blogs: [
                ...this.state.blogs.slice(0,replaced),
                {
                    ...this.state.blogs[replaced],
                    ...updated
                },
                ...this.state.blogs.slice(replaced+1)
            ]
        })
    }

    //
    // Here we remove the last image. This doesn't seem to be much of 
    // a limitation, since very few stories will have more than one image
    //
    submitImageRemove() {
        let target = this.state.blogs.find(r => r._id == this.state.removeImage).pictures;
        if (target.length == 0) return;  // nothing to do?

        axios.get("http://localhost:8000/blogs/picture/drop", {
            params: {
                id: this.state.removeImage,
                picture: target.slice(-1).pop()
            }
        })
        .then( (res) => {
            if (!res.data.success) throw res.error;

            let updated = this.state.blogs.findIndex(r => r._id == this.state.removeImage);

            this.setState({
                blogs: [
                    ...this.state.blogs.slice(0,updated),
                    {
                        ...this.state.blogs[updated],
                        pictures: this.state.blogs[updated].pictures.slice(0,-1)
                    },
                    ...this.state.blogs.slice(updated+1)
                ],
                removeImage: null
            })        
        })
        .catch( (err) => {
            console.log(err);
        });
    }


    cancelImageRemove() {
        this.setState({removeImage: null});
    }

    setImageFile(event) {
        this.setState({
            addImage: {
                ...this.state.addImage,
                image: event.target.files[0]
            }
        });
        return true;
    }

    setImageCaption(event) {
        this.setState({
            addImage: {
                ...this.state.addImage,
                caption: event.target.value
            }
        });
        return true;
    }

    cancelAddImage() {
        this.setState({addImage: null});
    }

    submitAddImage() {
        let formData = new FormData()
        formData.append('id', this.state.addImage.id );
        formData.append('image', this.state.addImage.image );
        formData.append('caption', this.state.addImage.caption );

        axios.post("http://localhost:8000/blogs/picture/post", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            if (!res.data.success) throw res.error;

            let updated = this.state.blogs.findIndex(r => r._id == this.state.addImage.id);

            this.setState({
                blogs: [
                    ...this.state.blogs.slice(0,updated),
                    {
                        ...this.state.blogs[updated],
                        pictures: [ ...this.state.blogs[updated].pictures, res.data.data ]
                    },
                    ...this.state.blogs.slice(updated+1)
                ],
                addImage: null,
                image: null
            })
        });
    }

    cellActions(col,row) {
        if (col.key == 'pictures') {
            let answer = [
                {
                    icon: <Icon icon="add"/>,
                    callback: () => this.setState({addImage: {id: row._id}})
                }
            ];

            if (row.pictures.length > 0) {
                answer.push({
                    icon: <Icon icon="remove" intent="warning"/>,
                    callback: () => this.setState({removeImage: row._id})
                })
            }

            return answer;
        }

        if (col.key == '_id') return [
            {
                icon: <Icon icon="add"/>,
                callback: () => this.setState({adding: true})
            },
            {
                icon: <Icon icon="edit"/>,
                callback: () => this.beginEdit(row)
            },
            {
                icon: <Icon icon="remove" intent="warning"/>,
                callback: () => this.setState({removing: row._id})
            }
        ];

        return;
    }

    sortRow( col, dir ) {
        switch(dir) {
            case 'ASC':
                this.setState({
                    blogs: this.state.blogs.sort( (a,b) => a[col] > b[col] ? 1 : -1 )
                })
                break;
            case 'DESC':
                this.setState({
                    blogs: this.state.blogs.sort( (a,b) => a[col] < b[col] ? 1 : -1 )
                })
                break;
        }
    }

    render() {
        const { adding, addBody, cats, editing, editBody, removing, removeImage, addImage, blogs } = this.state;

        if (blogs.length == 0) return <Spinner/>;

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
            },
            {
                key: 'created',
                name: 'Created',
                resizable: true,
                sortable: true,
                formatter: d => d.value ? timeStampToDate(d.value) : "ERROR"
            },
            {
                key: 'modified',
                name: 'Modified',
                resizable: true,
                sortable: true,
                formatter: d => d.value ? timeStampToDate(d.value) : ""
            },
            {
                key: 'pictures',
                name: 'Pictures',
                resizable: true,
                formatter: d => d.value.length
            }
        ];

        return (
            <div style={{position: 'relative'}}>
                <div style={{position: 'absolute', width: '100%'}}>
                    <ReactDataGrid
                        columns={columns}
                        rowGetter={i => blogs[i]}
                        rowsCount={blogs.length}
                        onGridSort={(c,d) => this.sortRow(c,d)}
                        enableCellSelect={true}
                        getCellActions={(r,c) => this.cellActions(r,c)}
                    />
                    <Dialog key="br" title="Confirm removal" isOpen={removing} onClose={() => this.cancelRemove()}>
                        <div className="dialog">
                            <div>Are you sure?</div>
                            <div className="buttons">
                                <Button icon="undo" text="Cancel" onClick={() => this.cancelRemove()}/>
                                <AnchorButton icon="remove" text="Remove" onClick={() => this.submitRemove()}/>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog key="ir" title="Confirm image removal" isOpen={removeImage} onClose={() => this.cancelImageRemove()}>
                        <div className="dialog">
                            <div>Are you sure?</div>
                            <div className="buttons">
                                <Button icon="undo" text="Cancel" onClick={() => this.cancelImageRemove()}/>
                                <AnchorButton icon="remove" text="Remove" onClick={() => this.submitImageRemove()}/>
                            </div>
                        </div>
                    </Dialog>
                    <Collapse isOpen={adding}>
                        <div className="preview">
                            <Markdown children={addBody} remarkPlugins={[gfm]}/>
                        </div>
                        <div className="dialog">
                            <InputGroup
                                placeholder="Title"
                                onChange={(e) => this.addOnChange("title",e)}
                            />
                            <TextArea
                                placeholder="Body"
                                className="bp3-fill"
                                onChange={(e) => this.addBodyChange(e)}
                            />
                            <div className="checks">
                                {cats.map( c => (
                                    <Checkbox
                                        key={c._id}
                                        inline={true}
                                        label={c.name}
                                        onChange={(e) => this.addCategory(e,c._id)}
                                    />
                                ))}
                            </div>
                            <div className="buttons">
                                <Button icon="undo" text="Cancel" onClick={() => this.cancelAdd()}/>
                                <AnchorButton icon="add" text="Add" onClick={() => this.submitAdd()}/>
                            </div>                        
                        </div>
                    </Collapse>
                    <Collapse isOpen={editing}>
                        <div className="preview">
                            <Markdown children={editBody} remarkPlugins={[gfm]}/>
                        </div>
                        {/* Use context specific key, to force refresh of default values */}
                        <div className="dialog" key={editing}>
                            <InputGroup
                                placeholder="Title"
                                defaultValue={this.edit.title}
                                onChange={(e) => this.editOnChange("title",e)}
                            />
                            <TextArea
                                placeholder="Body"
                                className="bp3-fill"
                                defaultValue={editBody}
                                onChange={(e) => this.editBodyChange(e)}
                            />
                            <div className="checks">
                                {cats.map( c => (
                                    <Checkbox
                                        key={c._id}
                                        inline={true}
                                        label={c.name}
                                        defaultChecked={this.edit.categories.includes(c._id)}
                                        onChange={(e) => this.editCategory(e,c._id)}
                                    />
                                ))}
                            </div>
                            <div className="buttons">
                                <Button icon="undo" text="Cancel" onClick={() => this.cancelEdit()}/>
                                <AnchorButton icon="confirm" text="Update" onClick={() => this.submitEdit()}/>
                            </div>                        
                        </div>
                    </Collapse>
                    <Collapse isOpen={addImage}>
                        <div className="dialog">
                            <FileInput text="Choose file..." onInputChange={(e) => this.setImageFile(e)}/>
                            <InputGroup
                                placeholder="Caption"
                                onChange={(e) => this.setImageCaption(e)}
                            />                            
                            <div className="buttons">
                                <Button icon="undo" text="Cancel" onClick={() => this.cancelAddImage()}/>
                                <AnchorButton icon="add" text="Add" onClick={() => this.submitAddImage()}/>
                            </div>                        
                        </div>
                    </Collapse>
                </div>
            </div>
        )    
    }
}


function timeStampToDate(ts) {
    return new Date(ts).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' } );
}



export default Blog;