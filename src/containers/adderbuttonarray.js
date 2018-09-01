import React from 'react';
import { Component } from 'react';
import AdderButton from './adderbutton';


class AdderButtonArray extends Component {

    render() {
        return <div className={"button-array"}>
            {[
                <AdderButton name={"Comment"}
                             rgb={this.props.annotation_order.find(e => e.type === 'comment').rgb}
                             onClick={() => this.props.onClickAdderButton('comment')}
                             active={this.props.active}
                />,
                <AdderButton name={"Exploration"}
                             rgb={this.props.annotation_order.find(e => e.type === 'exploration').rgb}
                             onClick={() => this.props.onClickAdderButton('exploration')}
                             active={this.props.active}
                />,
                <AdderButton name={"Visualization"}
                             rgb={this.props.annotation_order.find(e => e.type === 'visualization').rgb}
                             onClick={() => this.props.onClickAdderButton('visualization')}
                             active={this.props.active}
                />,
                <AdderButton name={"External Link"}
                             rgb={this.props.annotation_order.find(e => e.type === 'external link').rgb}
                             onClick={() => this.props.onClickAdderButton('external link')}
                             active={this.props.active}
                />,
                <AdderButton name={"External Data"}
                             rgb={this.props.annotation_order.find(e => e.type === 'external data').rgb}
                             onClick={() => this.props.onClickAdderButton('external data')}
                             active={this.props.active}
                />
            ]}
        </div>
    }

}

export default AdderButtonArray;