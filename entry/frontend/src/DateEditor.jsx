import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { DatePicker } from "@blueprintjs/datetime";
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

class DateEditor extends Component {
    constructor(props) {
        super(props);

        const date = new Date(props.value)

        this.state = {
            // Make sure we protect against an invalid date
            date: isFinite(date) ? date : new Date()
        }
    }

    onChange(d) {
        this.setState({
            date: d
        })
    }

    getValue() {
        // Note that our grid wants an isostring
        return { [this.props.column.key]: this.state.date.toISOString() }
    }
  
    getInputNode() {
        return ReactDOM.findDOMNode(this);        
    }
  
    render() {
        const { date } = this.state;

        return (
            <DatePicker className="grid-date" value={date} onChange={d => this.onChange(d)}/>
        );
    }
}

export default DateEditor;