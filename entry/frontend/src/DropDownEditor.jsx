import React, {Component} from 'react';
import ReactDOM from 'react-dom';

//
// A rewrite of code originally from react-data-grid-addons,
// but that package had an unfixed vulnerability
//
class DropDownEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: props.value
        }
    }

    getInputNode() {
        return ReactDOM.findDOMNode(this);
    }

    onClick() {
        this.getInputNode().focus();
    }

    onDoubleClick() {
        this.getInputNode().focus();
    }

    onChange(d) {
        this.setState({
            selected: d.target.value
        })
    }

    getValue() {
        return { [this.props.column.key]: this.state.selected }
    }

    render() {
        return (
            <select defaultValue={this.props.value} onBlur={this.props.onBlur} onChange={d => this.onChange(d)}>
                {this.props.options.map( n => (
                    <option key={n.value} value={n.value}>{n.text}</option>
                ))}
            </select>
        );
    }
}

export default DropDownEditor;
