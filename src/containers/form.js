import React from 'react';
import { Component } from 'react';
import CreateFormBody from './createformbody';
import ViewFormBody from './viewformbody';


class Form extends Component {

    render() {

        if (this.props.mode === "create") {
            return <CreateFormBody
                type={this.props.type}
                form_contents={this.props.form_contents}
                genericOnChange={this.props.genericOnChange}
                onBackButtonClick={this.props.onBackButtonClick}
                onResetButtonClick={this.props.onResetButtonClick}
                onSubmitButtonClick={this.props.onSubmit}
            />
        } else if (this.props.mode === "view") {
            return <ViewFormBody
                form_contents={this.props.form_contents}
                type={this.props.type}
                data_package_definition={this.props.data_package_definition}
                onBackButtonClick={this.props.onBackButtonClick}
            />
        }
    }

}

export default Form;