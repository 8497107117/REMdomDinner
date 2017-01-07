import React from 'react';

import ListItem from './ListItem';

class FavoriteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
    }

    changeListOpenState() {
        let isOpen = !this.state.isOpen;
        this.setState({ isOpen });
    }

    removeStoreFromFavorite() {
        console.log('remove store from favorite');
    }

    selectFavorite() {
        this.props.selectFavorite(this.props.storesData);
    }

    renderFavoriteListItem() {
        if (this.props.storesData.length == 0) {
            return (<li>無</li>);
        }
        return this.props.storesData.map((storeData) => {
            return (<ListItem key={storeData.listId} data={storeData} unselectStore={this.removeStoreFromFavorite.bind(this)} />);
        });
    }

    render() {
        let favoriteList;
        if (this.state.isOpen) {
            favoriteList = this.renderFavoriteListItem();
        }
        return (
            <ul>
                <div onClick={this.changeListOpenState.bind(this)}>{this.props.listName}</div>
                <button onClick={this.selectFavorite.bind(this)}></button>
                {favoriteList}
            </ul>
        );
    }
};

export default FavoriteList;