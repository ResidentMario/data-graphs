import React from 'react';
import { Component } from 'react';
import Button from './graphbutton';


class ButtonArray extends Component {

    render() {
        return <div className={"button-array"}>
            {[
                <Button name={"Comment"}
                        rgb={this.props.order.find(e => e.type === 'comment').rgb}
                        onClick={() => this.props.onClickButton('comment')}
                />,
                <Button name={"Exploration"}
                        rgb={this.props.order.find(e => e.type === 'exploration').rgb}
                        onClick={() => this.props.onClickButton('exploration')}
                />,
                <Button name={"Visualization"}
                        rgb={this.props.order.find(e => e.type === 'visualization').rgb}
                        onClick={() => this.props.onClickButton('visualization')}
                />,
                <Button name={"External Link"}
                        rgb={this.props.order.find(e => e.type === 'external link').rgb}
                        onClick={() => this.props.onClickButton('external link')}
                />,
                <Button name={"External Data"}
                        rgb={this.props.order.find(e => e.type === 'external data').rgb}
                        onClick={() => this.props.onClickButton('external data')}
                />
            ]}
        </div>
    }

}

export default ButtonArray;