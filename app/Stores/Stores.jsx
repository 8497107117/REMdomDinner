import React from 'react';
import Api from '../Api';
import Store from './Store';

class Stores extends React.Component {
    constructor(props) {
        super(props);
        this.state = { storesData: [] };
    }

    componentDidMount() {
        Api.getStoreData()
            .done((data) => {
                if (data)
                    this.setState({ storesData: data });
            });
    }

    renderStoresData() {
        return this.state.storesData.map((storeData) => {
            return (<Store key={storeData.id} auth={this.props.auth} data={storeData} selectStore={this.props.selectStore.bind(this)} />);
        });
    }

    render() {
        return (
            <div className="stores">
                <button>上</button>
                {this.renderStoresData()}
                <button>下</button>
            </div>
        );
    }
};

export default Stores;
