import React from 'react';
import { Component } from 'react';
import Graph from './graph';
import AdderButtonArray from './adderbuttonarray';
import Form from './form';


class App extends Component {

    constructor() {
        super();

        this.state = {
            // Order of pie slices. Index 0 corresponds with the top-left slice, rest follow in clockwise order.
            'annotation_order': [
                {type: 'exploration', rgb: '215,25,28'},
                {type: 'visualization', rgb: '43,131,186'},
                {type: 'comment', rgb: '253,174,97'},
                {type: 'external link', rgb: '145,210,135'},
                {type: 'external data', rgb: '255,206,60'}
            ],
            'icons': {
                'exploration': '🔎',
                'visualization': '📊',
                'comment': '💬',
                'external link': '🔗',
                'external data': '📌',
                'datapackage': '💾'
            },
            'graph_contents': {
                'exploration': [],
                'visualization': [],
                'comment': [],
                'external link': [],
                'external data': []
            },
            'count_annotation_nodes': 0,
            'data_package_defined': false,

            // If no form is open this will be null.
            // If a form is open, this will be a {type: str, contents: {...fields}, mode: str} struct.
            // Legal types: {comments, exploration, ..., datapackage}.
            // Legal modes: {create, view, edit}
            'form': null,
            'data_package_definition': null,
            'graph_id': null
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", (event) => {
            if (event.keyCode === 27){
                if (this.state.form) {
                    this.setState(Object.assign({}, this.state, {form: null}));
                }
            }
        }, false);
    }

    render() {
        const onClickAdderButton = (type) => {
            if (this.state.data_package_defined) {
                this.setState(Object.assign({}, this.state, {form: {type: type, contents: {}, mode: 'create'}}));
            }
        };

        const genericOnChange = (func) => {
            this.setState(Object.assign(
                {}, this.state,
                {form: {
                    type: this.state.form.type,
                    contents: func(this.state.form.contents),
                    mode: this.state.form.mode
                }})
            );
        };

        const onBackButtonClick = () => {
            this.setState(Object.assign({}, this.state, {form: null}));
        };

        const onResetButtonClick = () => {
            this.setState(Object.assign({}, this.state, {form: {
                type: this.state.form.type,
                contents: {},
                mode: this.state.form.mode
            }}));

            // TODO: this is an unsightly hack.
            document.getElementById('form-textarea-title').value = "";
            document.getElementById('form-textarea-link').value = "";
            document.getElementById('form-textarea-body').value = "";
        };

        const onSubmit = () => {
            const type = this.state.form.type;
            const new_obj = this.state.form.contents;

            if (this.state.form.type === 'datapackage') {
                // Path for defining a dataset.
                let newDataPackageDefinition = Object.assign({}, new_obj);

                this.setState(Object.assign({}, this.state,
                    {
                        form: null,
                        data_package_definition: newDataPackageDefinition,
                        data_package_defined: true
                    })
                );
            } else {
                // Path for adding nodes.
                let newContents = Object.assign({}, this.state.graph_contents);
                newContents[type].push(new_obj);

                this.setState(Object.assign({}, this.state,
                    {form: null, contents: newContents,
                        count_annotation_nodes: this.state.count_annotation_nodes + 1})
                );
            }
        };

        const onClickDataPackageNode = () => {
            if (!this.state.data_package_defined) {
                this.setState(Object.assign({}, this.state, {form:
                        {type: 'datapackage', contents: {}, mode: 'create'}}));
            } else {
                this.setState(Object.assign({}, this.state, {form: {type: 'datapackage', contents: {}, mode: 'view'}}))
            }
        };

        const onClickAnnotationNode = (cls, item_idx) => {
            this.setState(Object.assign({}, this.state, {form:
                    {type: cls, contents: this.state.graph_contents[cls][item_idx], mode: 'view'}}));
        };

        let form = (this.state.form) ?
            <Form type={this.state.form.type}
                  mode={this.state.form.mode}
                  form_contents={this.state.form.contents}
                  genericOnChange={genericOnChange}
                  onBackButtonClick={onBackButtonClick}
                  onResetButtonClick={onResetButtonClick}
                  onSubmit={onSubmit}
                  data_package_definition={this.state.data_package_definition}
                  icons={this.state.icons}
                  annotation_order={this.state.annotation_order}
            /> :
            null;

        return <div className={"app-frame"}>
            {[
                <div className={"form-placement-frame"}>
                    {form}
                </div>,
                <div>
                    <div className={"graph-viz-frame"} style={{opacity: this.state.form? 0.5 : 1}}>
                        <Graph
                            annotation_order={this.state.annotation_order}
                            contents={this.state.graph_contents}
                            data_package_defined={this.state.data_package_defined}
                            count_annotation_nodes={this.state.count_annotation_nodes}
                            onClickDataPackageNode={onClickDataPackageNode}
                            onClickAnnotationNode={onClickAnnotationNode}
                            icons={this.state.icons}
                        />
                    </div>
                    <div className={"footer-frame"}>
                            <AdderButtonArray annotation_order={this.state.annotation_order}
                                              onClickAdderButton={onClickAdderButton}
                                              active={this.state.data_package_defined}/>
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