import React from 'react';
import { Component } from 'react';


class Button extends Component {

    render() {
        return <div className={"button-frame"} style={
            {
                background: `rgba(${this.props.rgb},0.7)`,
                boxShadow: `0 0 2px 2px rgba(${this.props.rgb},0.5)`,
                border: `1px solid rgba(${this.props.rgb},1)`
            }
        }>
            <div className={"button-circle"}>+</div>
            {this.props.name}
        </div>
    }

}

export default Button;