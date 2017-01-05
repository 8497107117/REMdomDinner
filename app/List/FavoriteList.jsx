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

    addFavoriteList() {
        console.log("FFF");
    }

    renderFavoriteListItem() {
        if (this.props.storesData.length == 0) {
            return (<li>無</li>);
        }
        return this.props.storesData.map((storeData) => {
            return (<ListItem key={storeData.id} data={storeData} />);
        });
    }

    render() {
        let favoriteList;
        if (this.state.isOpen) {
            favoriteList = (
                <ul>
                    {this.renderFavoriteListItem()}
                </ul>
            );
        }
        return (
            <div className="list">
                <div onClick={this.changeListOpenState.bind(this)}>{this.props.listName}</div>
                {favoriteList}
            </div>
        );
    }
};

export default FavoriteList;