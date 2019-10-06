import React, {Component} from 'react';
import { Tab, Tabs } from "@blueprintjs/core";
import Gig from "./Gig";
import Venue from "./Venue";
import Director from "./Director";
import Group from "./Group";
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
                <Tabs renderActiveTabPanelOnly="true">
                    <Tab id="gig" title="Gig" panel={<Gig />} />
                    <Tab id="venue" title="Venue" panel={<Venue />} />
                    <Tab id="director" title="Director" panel={<Director />} />
                    <Tab id="group" title="Group" panel={<Group />} />
                </Tabs>
            </div>
        )
    }
}

export default App;