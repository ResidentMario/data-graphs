import React from 'react';
import { Component } from 'react';
import Graph from './graph';
import ButtonArray from './buttonarray';
import Form from './form';


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
            'database_defined': true,
            // null if no form is open, @type if one is.
            'form_open': null,
            'form_contents': {}
        }
    }

    render() {
        const onClickButton = (type) => {
            this.setState(Object.assign({}, this.state, {form_open: type, form_contents: {}}));
        };

        const genericOnChange = (func) => {
            console.log(this.state.form_contents);
            this.setState(Object.assign(
                {},
                this.state,
                {form_contents: func(this.state.form_contents)}
                )
            );
        };

        let form = (this.state.form_open) ?
            <Form type={this.state.form_open}
                  form_contents={this.state.form_contents}
                  genericOnChange={genericOnChange}
            /> :
            null;

        return <div className={"app-frame"}>
            {[
                <div className={"form-placement-frame"}>
                    {form}
                </div>,
                <div>
                    <div className={"graph-viz-frame"} style={{opacity: this.state.form_open? 0.5 : 1}}>
                        <Graph
                            order={this.state.order}
                            contents={this.state.contents}
                            database_defined={this.state.database_defined}
                        />
                    </div>
                    <div className={"footer-frame"}>
                            <ButtonArray order={this.state.order} onClickButton={onClickButton}/>
                        <div className={"sharer-frame"}>
                        {/*// TODO*/}
                        </div>
                    </div>
                </div>
            ]}
        </div>
    }

}

export default App;