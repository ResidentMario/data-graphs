import React from 'react';
import { Component } from 'react';
import Graph from './graph';
import ButtonArray from './buttonarray';


class App extends Component {

    constructor() {
        super();

        this.state = {
            'graph_id': null,
            // Order of pie slices. Index 0 corresponds with the top-left slice, rest follow in clockwise order.
            'order': [
                {type: 'exploration', rgb: '215,25,28'},
                {type: 'visualization', rgb: '43,131,186'},
                {type: 'comment', rgb: '253,174,97'},
                {type: 'external link', rgb: '171,221,164'},
                {type: 'external data', rgb: '255,255,191'}
            ],
            'contents': {
                'exploration': ['Foo'],
                'visualization': ['Bar'],
                'comment': ['Baz'],
                'external link': [],
                'external data': []
            },
            'database_defined': true
        }
    }

    render() {
        return <div className={"app-frame"}>
            <div className={"graph-viz-frame"}>
                <Graph
                    order={this.state.order}
                    contents={this.state.contents}
                    database_defined={this.state.database_defined}/>
            </div>
            <div className={"footer-frame"}>
                <ButtonArray order={this.state.order}/>

                <div className={"sharer-frame"}>
                    {/*// TODO*/}
                </div>
            </div>
        </div>
    }

}

export default App;