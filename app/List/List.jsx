import React from 'react';

import FavoriteList from './FavoriteList';
import ListItem from './ListItem';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { randomStore: {}, favoriteList: {} };
    }

    componentWillMount() {
        let favoriteList = [{ id: 1, listName: '好冷想喝湯', storesData: [{ id: 12, name: '二鍋' }, { id: 8, name: '火鍋豪棒棒' }] }, { id: 2, listName: '牛排R', storesData: [{ id: 6, name: '87牛排館' }] }];
        this.setState({ favoriteList });
    }

    addFavoriteList(event) {
        event.preventDefault();
        console.log('add favorite');
        console.log('listName : ', this.refs.listname.value);
    }

    randomDecide() {
        let randomStore = this.props.storesData[Math.floor(Math.random() * this.props.storesData.length)];
        this.setState({ randomStore });
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
            return (<FavoriteList key={listData.id} listName={listData.listName} storesData={listData.storesData} selectFavorite={this.props.selectFavorite.bind(this)} />);
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
        let favoriteList;
        let randomStore;
        let listButton;
        if(this.props.auth.isLogin){
            favoriteList = this.renderFavoriteList();
        }
        if (Object.keys(this.state.randomStore).length === 0 && this.state.randomStore.constructor === Object) {
            randomStore = <div>請選擇</div>;
        }
        else {
            randomStore = <div>去吃{this.state.randomStore.name}吧！</div>;
        }
        if (this.props.storesData.length != 0) {
            let addFavoriteForm;
            if (this.props.auth.isLogin) {
                addFavoriteForm = (
                    <form>
                        <input type="text" name="listname" placeholder="最愛清單名稱" ref="listname" />
                        <button onClick={this.addFavoriteList.bind(this)}>加入最愛</button>
                    </form>
                );
            }
            listButton = (
                <div>
                    <button onClick={this.randomDecide.bind(this)}>隨機</button>
                    <button onClick={this.resetRandom.bind(this)}>清除</button>
                    {addFavoriteForm}
                </div>
            );
        }
        return (
            <div className="list">
                {favoriteList}
                {randomStore}
                {listButton}
                < ul >
                    {this.renderListItem()}
                </ul >
            </div>
        );
    }
};

export default List;
