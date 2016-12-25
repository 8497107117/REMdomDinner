import React from 'react';

import Stores from '../Stores/Stores';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    selectStore(data, isSelected) {
        console.log(data, isSelected);
    }

    render() {
        return (
            <Stores selectStore={this.selectStore.bind(this)} />
        );
    }
};

export default Index;