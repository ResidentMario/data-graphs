import React from 'react';
import { Component } from 'react';


class FormButton extends Component {

    render() {
        let contents = null;
        if (this.props.button_type === "back") {
            contents = '←';
        } else if (this.props.button_type === "reset") {
            contents = '↻';
        } else {
            contents = '✓';
        }

        const type_classname = `form-fill-button-${this.props.button_type}`;
        const active_classname = `form-fill-button-${this.props.active ? 'active' : 'inactive'}`;

        return <div className={`form-fill-button ${type_classname} ${active_classname}`}
                    onClick={this.props.active ? this.props.onClick : undefined}>
            {contents}
        </div>
    }

}

export default FormButton;