import React from 'react';
import { Component } from 'react';
import FormButton from "./formbutton";


// TODO: Clean up redesign/refactor.
class ViewFormBody extends Component {

    render() {
        const toTitleCase = (str) => {
            return str.replace(
                /\w\S*/g,
                function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        };

        let c = null;
        if (this.props.type === "comment") {
            return [
                <div className={"form-explainer"}>
                    <div className={"form-view-text form-view-text-title"}>{this.props.form_contents.title}</div>

                    <div className={"form-view-text"}>{this.props.form_contents.description}</div>
                </div>,
                <FormButton button_type={'back'} active={true} onClick={this.props.onBackButtonClick}/>
            ]
        } else if (this.props.type !== "datapackage") {
            return [
                <div className={"form-explainer"}>
                    {toTitleCase(this.props.type)}: <a className={"form-view-text form-view-text-title form-view-text-bold-hyperlink"}
                       href={this.props.data_package_definition.link}>{this.props.form_contents.title}</a>
                </div>,
                <FormButton button_type={'back'} active={true} onClick={this.props.onBackButtonClick}/>
            ]
        } else {  // data package
            c = <p className={"form-view-text-title"}>You are viewing a data graph for the <a className={"form-view-text-bold-hyperlink"} href={this.props.data_package_definition.link}>{this.props.data_package_definition.title}</a> data package.</p>;

            return [
                <div className={"form-explainer"}>
                    {c}
                </div>,
                <FormButton button_type={'back'} active={true} onClick={this.props.onBackButtonClick}/>
            ]
        }
    }
}

export default ViewFormBody;