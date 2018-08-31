import React from 'react';
import { Component } from 'react';
import Button from './button';


class ButtonArray extends Component {

    render() {
        return <div className={"button-array"}>
            {[
                <Button name={"Comment"} rgb={this.props.order.find(e => e.type === 'comment').rgb}/>,
                <Button name={"Exploration"} rgb={this.props.order.find(e => e.type === 'exploration').rgb}/>,
                <Button name={"Visualization"} rgb={this.props.order.find(e => e.type === 'visualization').rgb}/>,
                <Button name={"External Link"} rgb={this.props.order.find(e => e.type === 'external link').rgb}/>,
                <Button name={"External Data"} rgb={this.props.order.find(e => e.type === 'external data').rgb}/>
            ]}
        </div>
    }

}

export default ButtonArray;