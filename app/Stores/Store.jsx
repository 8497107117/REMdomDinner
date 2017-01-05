import React from 'react';

class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    selectStore(event) {
        event.preventDefault();
        this.props.selectStore(this.props.data);
    }

    render() {
        return (
            <div className="store" onClick={this.selectStore.bind(this)}>
                <div>{this.props.data.name}</div>
                <div>{this.props.data.address}</div>
                <div>{this.props.data.phone}</div>
                <div>{this.props.data.avg_price}</div>
            </div>
        );
    }
};

export default Store;
