import React from 'react';
import { Component } from 'react';
import FormFill from './formfill';
import FormButton from "./formbutton";


class Form extends Component {

    render() {

        let c = null;
        if (this.props.type === "comment") {
            c = <p><span className="form-label-emph">Comments</span> are a lightweight way of telling other users what to expect from a dataset. A quality comment might point out an inconsistency in the dataset to watch out for, provide domain knowledge on the contents of the dataset helpful for analysis, or summarize how well the dataset fits a specific use case.</p>
        } else if (this.props.type === "exploration") {
            c = <p><span className="form-label-emph">Explorations</span>, also known as exploratory data analyses, are code-literate analyses (usually in Jupyter or RMarkdown) of a dataset. A good exploration provides a good overview of important or useful features of the dataset, one that other users may use as the basis of their own work.</p>
        } else if (this.props.type === "visualization") {
            c = <p><span className="form-label-emph">Visualizations</span> are graphics created using a dataset. A good visualization provides a clear, interpretable result about one or more features of a dataset.</p>
        } else if (this.props.type === "external link") {
            c = <p><span className="form-label-emph">External links</span> point to additional resources (not explorations or visualizations) useful for interpreting a dataset. A good example of an external link might be a document describing where the data came from and how it was collected.</p>
        } else if (this.props.type === "external data") {
            c = <p><span className="form-label-emph">External data</span> are links to other datasets which may be useful in analyzing this one. Good external data include so-called "support datasets": simple datasets which, whilst not very useful on their own, can help contextualize more complex ones.</p>
        } else {  // dataset
            c = "";
        }

        let submit_button_active = false;
        let form_keys = Object.keys(this.props.form_contents);
        if (form_keys.length >= 2 && form_keys.map(k => this.props.form_contents[k].length > 0).every(v => v)) {
            submit_button_active = true;
        }

        const reset_button_active = form_keys.length > 0 && form_keys.map(k => this.props.form_contents[k].length > 0).some(v => v);


        return <div className={"form-frame"}>
            <div className={"form-explainer"}>{c}</div>
            <div className={"form-fill-frame"}>
                <FormFill type={this.props.type} form_contents={this.props.form_contents} genericOnChange={this.props.genericOnChange}/>
            </div>
            <FormButton button_type={'back'} active={true} onClick={this.props.onBackButtonClick}/>
            <FormButton button_type={'reset'} active={reset_button_active} onClick={this.props.onResetButtonClick}/>
            <FormButton button_type={'submit'} active={submit_button_active} onClick={this.props.onSubmit}/>
        </div>
    }

}

export default Form;