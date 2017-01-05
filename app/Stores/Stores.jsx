import React from 'react';
import Api from '../Api';
import Store from './Store';

class Stores extends React.Component {
    constructor(props) {
        super(props);
        let defaultData = [
            {id: 1, name: "a", address: "hsinchu", phone: "888", avg_price: "100"},
            {id: 2, name: "b", address: "hsinchu", phone: "888", avg_price: "100"},
            {id: 3, name: "c", address: "hsinchu", phone: "888", avg_price: "100"},
            {id: 4, name: "d", address: "hsinchu", phone: "888", avg_price: "100"},
        ];
        this.state = { storesData: defaultData };
    }

    componentWillMount() {
        Api.getStoreData()
            .done((data) => {
                if(data)
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
            <div className="stores">
                {this.renderStoresData()}
            </div>
        );
    }
};

export default Stores;
