import React from 'react';

import List from '../List/List';
import Stores from '../Stores/Stores';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedStore: [] };
    }

    selectFavorite(storesData) {
        let selectedStore = this.state.selectedStore;
        storesData.map((storeData) => {
            this.selectStore(storeData);
        });
    }

    unselectStore(data) {
        let selectedStore = this.state.selectedStore;
        let isSelected = false;
        let key = -1;

        for (let i = 0; i < selectedStore.length; i++) {
            if (selectedStore[i].id == data.id) {
                key = i;
                isSelected = true;
                break;
            }
        }
        if (isSelected) {
            selectedStore.splice(key, 1)
            this.setState({ selectedStore });
        }
    }

    restSelected() {
        this.setState({ selectedStore: [] });
    }

    render() {
        return (
            <div className="container">
                <List auth={this.props.auth} selectFavorite={this.selectFavorite.bind(this)} unselectStore={this.unselectStore.bind(this)} resetSelected={this.restSelected.bind(this)} storesData={this.state.selectedStore} />
                <Stores auth={this.props.auth} selectStore={this.selectStore.bind(this)} />
            </div>
        );
    }
};

export default Index;
