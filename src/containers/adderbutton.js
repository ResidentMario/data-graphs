import React from 'react';
import { Component } from 'react';


class AdderButton extends Component {

    render() {
        let style = null;
        if (this.props.active) {
            style = {
                background: `rgba(${this.props.rgb},0.7)`,
                boxShadow: `0 0 2px 2px rgba(${this.props.rgb},0.5)`,
                border: `1px solid rgba(${this.props.rgb},1)`
            };
        } else {
            let gray = '200,200,200';
            style = {
                background: `rgba(${gray},0.7)`,
                boxShadow: `0 0 2px 2px rgba(${gray},0.5)`,
                border: `1px solid rgba(${gray},1)`,
            }
        }

        const active = this.props.active ? 'active' : 'inactive';

        return <div className={`button-frame button-frame-${active}`}
                    style={style}
                    onClick={this.props.onClick}>
            <div className={`button-circle button-circle-${active}`}>+</div>
            {this.props.name}
        </div>
    }

}

export default AdderButton;