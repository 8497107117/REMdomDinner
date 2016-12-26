import React from 'react';

import List from '../List/List';
import Stores from '../Stores/Stores';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedStore: [] };
    }

    selectStore(data, isSelected) {
        let selectedStore = this.state.selectedStore;
        if (isSelected) {
            selectedStore.push(data);
            this.setState({ selectedStore });
        }
        else {
            let key = -1;
            for (let i = 0; i < selectedStore.length; i++) {
                if (selectedStore[i].id == data.id) {
                    key = i;
                    break;
                }
            }
            selectedStore.splice(key, 1)
            this.setState({ selectedStore });
        }
        console.log(this.state.selectedStore);
    }

    render() {
        return (
            <div>
                <List storesData={this.state.selectedStore}/>
                <Stores selectStore={this.selectStore.bind(this)} />
            </div>
        );
    }
};

export default Index;