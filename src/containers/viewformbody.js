import React from 'react';
import { Component } from 'react';
import FormButton from "./formbutton";


// TODO: Clean up redesign/refactor.
class ViewFormBody extends Component {

    render() {

        let c = null;
        if (this.props.type === "comment") {

            return <div className={"form-frame"}>
                <div className={"form-explainer"}>
                    <div className={"form-view-text form-view-text-title"}>{this.props.form_contents.title}</div>

                    <div className={"form-view-text"}>{this.props.form_contents.description}</div>
                </div>
                <FormButton button_type={'back'} active={true} onClick={this.props.onBackButtonClick}/>
            </div>;

        } else if (this.props.type !== "datapackage") {

            return <div className={"form-frame"}>
                <div className={"form-explainer"}>
                    <a className={"form-view-text form-view-text-title form-view-text-bold-hyperlink"} href={this.props.data_package_definition.link}>{this.props.form_contents.title}</a>
                </div>
                <FormButton button_type={'back'} active={true} onClick={this.props.onBackButtonClick}/>
            </div>;

        } else {  // data package
            c = [<p className={"form-view-text-title"}>You are viewing a data graph for the <a className={"form-view-text-bold-hyperlink"} href={this.props.data_package_definition.link}>{this.props.data_package_definition.title}</a> data package.</p>];

            return <div className={"form-frame"}>
                <div className={"form-explainer"}>
                    {c}
                </div>
                <FormButton button_type={'back'} active={true} onClick={this.props.onBackButtonClick}/>
            </div>;
        }
    }
}

export default ViewFormBody;