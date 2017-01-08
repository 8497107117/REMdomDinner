import React from 'react';
import Api from '../Api';

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

    deleteFavoriteList() {
        Api.deleteFavoriteList(this.props.listNameId, this.props.auth.token)
            .done(() => {
                this.props.updateFavoriteList();
            });
    }

    deleteStoreFromFavorite(data) {
        Api.deleteStoreFromFavoriteList(data.favlistId, this.props.auth.token)
            .done(() => {
                this.props.updateFavoriteList();
            });
    }

    selectFavorite() {
        this.props.selectFavorite(this.props.storesData);
    }

    renderFavoriteListItem() {
        if (this.props.storesData.length == 0) {
            return (<li>無</li>);
        }
        return this.props.storesData.map((storeData) => {
            return (<ListItem key={storeData.id} data={storeData} unselectStore={this.deleteStoreFromFavorite.bind(this)} />);
        });
    }

    render() {
        let favoriteList;
        if (this.state.isOpen) {
            favoriteList = this.renderFavoriteListItem();
        }
        return (
            <ul>
                <div >{this.props.listName}</div>
                <button className="favo-exp ui inverted violet icon button" onClick={this.changeListOpenState.bind(this)}>
                    <i className="caret down icon"></i>
                </button>
                <button className="favo-add ui inverted blue icon button" onClick={this.selectFavorite.bind(this)}>
                    <i className="plus icon"></i>
                </button>
                <button className="favo-del ui inverted red icon button" onClick={this.deleteFavoriteList.bind(this)}>
                    <i className="remove circle icon"></i>
                </button>
                {favoriteList}
            </ul>
        );
    }
};

export default FavoriteList;
