import React, {Component} from 'react';
import { Tab, Tabs } from "@blueprintjs/core";
import Gig from "./Gig";
import Venue from "./Venue";
import '@blueprintjs/core/lib/css/blueprint.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 'gig'
        };
    }

    render() {
        return (
            <div>
                <Tabs id="TabsExample">
                    <Tab id="gig" title="Gig" panel={<Gig />} />
                    <Tab id="venue" title="Venue" panel={<Venue />} />
                </Tabs>
            </div>
        )
    }
}

export default App;