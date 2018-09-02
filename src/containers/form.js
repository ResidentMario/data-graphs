import React from 'react';
import { Component } from 'react';
import CreateFormBody from './createformbody';
import ViewFormBody from './viewformbody';


class Form extends Component {

    render() {
        let icon = this.props.icons[this.props.type];
        let rgb = this.props.type === "datapackage" ? null :
            this.props.annotation_order.find(e => e.type === this.props.type).rgb;
        let bgcolor = this.props.type === "datapackage" ? "white" : `rgba(${rgb},1)`;
        let color = this.props.type === "datapackage" ? "black" : "white";
        let bordercolor = this.props.type === "datapackage" ? "lightgray" : `rgba(${rgb},1)`;
        // let contents_bgcolor = this.props.type === "datapackage" ? "white" : `rgba(${rgb},0.05)`;
        let form_frame_style = {border: `5px solid ${bordercolor}`};

        let common = [
            <div className={"form-sidebar"} style={{backgroundColor: bgcolor}}/>,
            <div className={"form-icon"} style={{color: color}}>{icon}</div>,
            <div className={"form-content-insert"} />
        ];

        if (this.props.mode === "create") {
            return <div className={"form-frame"} style={form_frame_style}>
                {common}
                <CreateFormBody
                    type={this.props.type}
                    form_contents={this.props.form_contents}
                    genericOnChange={this.props.genericOnChange}
                    onBackButtonClick={this.props.onBackButtonClick}
                    onResetButtonClick={this.props.onResetButtonClick}
                    onSubmitButtonClick={this.props.onSubmit}
                />
            </div>
        } else if (this.props.mode === "view") {
            return <div className={"form-frame"} style={form_frame_style}>
                {common}
                <ViewFormBody
                    form_contents={this.props.form_contents}
                    type={this.props.type}
                    data_package_definition={this.props.data_package_definition}
                    onBackButtonClick={this.props.onBackButtonClick}
                />
            </div>
        }
    }

}

export default Form;