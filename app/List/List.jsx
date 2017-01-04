import React from 'react';

import ListItem from './ListItem';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { randomStore: {} };
    }

    randomDecide() {
        let randomStore = this.props.storesData[Math.round(Math.random() * this.props.storesData.length)];
        this.setState({ randomStore });
    }

    resetRandom() {
        this.setState({ randomStore: {} });
        this.props.resetSelected();
    }

    renderListItem() {
        if (this.props.storesData.length == 0) {
            return (<li>none</li>);
        }
        return this.props.storesData.map((storeData) => {
            return (<ListItem key={storeData.id} data={storeData} unselected={this.props.unselected.bind(this)} />);
        });
    }

    render() {
        let randomStore;
        let randomButton;
        if (Object.keys(this.state.randomStore).length === 0 && this.state.randomStore.constructor === Object) {
            randomStore = <div>請選擇</div>;
        }
        else {
            randomStore = <div>去吃{this.state.randomStore.name}吧！</div>;
        }
        if (this.props.storesData.length != 0) {
            randomButton = (
                <div>
                    <button onClick={this.randomDecide.bind(this)}>隨機</button>
                    <button onClick={this.resetRandom.bind(this)}>清除</button>
                </div>
            );
        }
        return (
            <div>
                {randomStore}
                {randomButton}
                < ul >
                    {this.renderListItem()}
                </ul >
            </div>
        );
    }
};

export default List;