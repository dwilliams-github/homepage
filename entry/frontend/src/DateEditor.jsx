import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { DatePicker } from "@blueprintjs/datetime";
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

class DateEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(props.value)
        }
    }

    onChange(d) {
        this.setState({
            date: d
        })
    }

    getValue() {
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