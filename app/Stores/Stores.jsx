import React from 'react';
import Api from '../Api';
import Store from './Store';

class Stores extends React.Component {
    constructor(props) {
        super(props);
        this.state = { storesData: [] };
    }

    componentWillMount() {
        Api.getStoreData()
            .done((data) => {
                this.setState({ storesData: data });
            });
    }

    renderStoresData() {
        return this.state.storesData.map((storeData) => {
            return (<Store key={storeData.id} data={storeData} selectStore={this.props.selectStore.bind(this)} />);
        });
    }

    render() {
        return (
            <div>
                {this.renderStoresData()}
            </div>
        );
    }
};

export default Stores;