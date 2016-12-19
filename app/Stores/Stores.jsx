import React from 'react';

import Store from './Store';

class Stores extends React.Component {
    constructor(props) {
        super(props);
        this.state = { storesData: [] };
    }

    componentWillMount() {
        this.setState({ storesData: [{ id: 1, name: 'Store1' }, { id: 2, name: 'Store2' }] });
    }

    renderStoresData() {
        return this.state.storesData.map((storeData) => {
            return (<Store key={storeData.id} data={storeData} selectStore={this.props.selectStore.bind(this)}/>);
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