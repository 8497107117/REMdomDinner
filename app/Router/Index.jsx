import React from 'react';

import List from '../List/List';
import Stores from '../Stores/Stores';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedStore: [] };
    }

    selectStore(data) {
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
        else {
            selectedStore.push(data);
            this.setState({ selectedStore });
        }
        console.log(this.state.selectedStore);
    }

    render() {
        return (
            <div>
                <List storesData={this.state.selectedStore} />
                <Stores selectStore={this.selectStore.bind(this)} />
            </div>
        );
    }
};

export default Index;