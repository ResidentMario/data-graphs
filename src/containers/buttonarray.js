import React from 'react';
import { Component } from 'react';
import GraphButton from './graphbutton';


class ButtonArray extends Component {

    render() {
        return <div className={"button-array"}>
            {[
                <GraphButton name={"Comment"}
                             rgb={this.props.order.find(e => e.type === 'comment').rgb}
                             onClick={() => this.props.onClickButton('comment')}
                             active={this.props.active}
                />,
                <GraphButton name={"Exploration"}
                             rgb={this.props.order.find(e => e.type === 'exploration').rgb}
                             onClick={() => this.props.onClickButton('exploration')}
                             active={this.props.active}
                />,
                <GraphButton name={"Visualization"}
                             rgb={this.props.order.find(e => e.type === 'visualization').rgb}
                             onClick={() => this.props.onClickButton('visualization')}
                             active={this.props.active}
                />,
                <GraphButton name={"External Link"}
                             rgb={this.props.order.find(e => e.type === 'external link').rgb}
                             onClick={() => this.props.onClickButton('external link')}
                             active={this.props.active}
                />,
                <GraphButton name={"External Data"}
                             rgb={this.props.order.find(e => e.type === 'external data').rgb}
                             onClick={() => this.props.onClickButton('external data')}
                             active={this.props.active}
                />
            ]}
        </div>
    }

}

export default ButtonArray;