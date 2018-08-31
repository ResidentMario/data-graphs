import React from 'react';
import { Component } from 'react';
import Graph from './graph';


class App extends Component {

    constructor() {
        super();

        this.state = {
            'graph_id': null
        }
    }

    render() {
        return <div className={"app-frame"}>
            <div className={"graph-viz-frame"}>
                <Graph/>
            </div>
            <div className={"footer-frame"}>
            </div>
        </div>
    }

}

export default App;