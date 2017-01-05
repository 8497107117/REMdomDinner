import React from 'react';

import FavoriteList from './FavoriteList';
import ListItem from './ListItem';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { randomStore: {}, favoriteList: {} };
    }

    componentWillMount() {
        let favoriteList = [{ id: 1, listName: '好冷想喝湯', storesData: [] }, { id: 2, listName: '牛排R', storesData: [] }];
        this.setState({ favoriteList });
    }

    randomDecide() {
        let randomStore = this.props.storesData[Math.round(Math.random() * this.props.storesData.length)];
        this.setState({ randomStore });
    }

    addFavoriteList() {
        console.log("FFF");
    }

    resetRandom() {
        this.setState({ randomStore: {} });
        this.props.resetSelected();
    }

    renderFavoriteList() {
        if (Object.keys(this.state.favoriteList).length === 0) {
            return;
        }
        return this.state.favoriteList.map((listData) => {
            return (<FavoriteList key={listData.id} listName={listData.listName} storesData={listData.storesData} />);
        });
    }

    renderListItem() {
        if (this.props.storesData.length == 0) {
            return (<li>無選擇</li>);
        }
        return this.props.storesData.map((storeData) => {
            return (<ListItem key={storeData.id} data={storeData} unselectStore={this.props.unselectStore.bind(this)} />);
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
                    <button onClick={this.addFavoriteList.bind(this)}>加入</button>
                    <button onClick={this.resetRandom.bind(this)}>清除</button>
                </div>
            );
        }
        return (
            <div className="list">
                {this.renderFavoriteList()}
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
