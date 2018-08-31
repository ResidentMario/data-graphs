import React from 'react';
import { Component } from 'react';


class FormFill extends Component {

    render() {
        const onChangeBody = (event) => {
            return (priorState) => { return Object.assign({}, priorState, {'description': event.target.value})};
        };

        const onChangeTitle = (event) => {
            return (priorState) => { return Object.assign({}, priorState, {'title': event.target.value})};
        };

        const onChangeLink = (event) => {
            return (priorState) => { return Object.assign({}, priorState, {'link': event.target.value})};
        };

        const formFactory = (title, body, link) => {
            let objs = [];
            if (title) {
                objs.push(
                    <div className={"form-subarea"}>
                        <div className={"form-fill-label"}>Title</div>
                        <textarea className={"form-textarea-title"} placeholder={"Your title"} onChange={(event) => {
                        this.props.genericOnChange(onChangeTitle(event));}}/>
                    </div>
                )
            }
            if (body) {
                objs.push(<div className={"form-subarea"}>
                        <div className={"form-fill-label"}>Explanation</div>
                        <textarea className={"form-textarea-body"} placeholder={"Your comment body"} onChange={(event) => {
                            this.props.genericOnChange(onChangeBody(event));
                        }}/>
                    </div>
                )
            }
            if (link) {
                objs.push(<div className={"form-subarea"}>
                        <div className={"form-fill-label"}>Link</div>
                        <textarea className={"form-textarea-link"} placeholder={"Your external URL"} onChange={(event) => {
                            this.props.genericOnChange(onChangeLink(event));
                        }}/>
                    </div>
                )
            }
            return <div className={"form-fill-areas-container"}>
                {objs}
            </div>
        };

        if (this.props.type === "comment") {
            return formFactory(true, true, false);
        } else {
            return formFactory(true, false, true);
        }
    }

}

export default FormFill;