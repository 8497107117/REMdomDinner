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
        let type = this.props.data.storetype ? <div>{this.props.data.storetype.type}</div> : <div>無</div>;
        let area = this.props.data.area ? <div>{this.props.data.area.area}</div> : <div>無</div>;
        return (
            <div className="store">
                <div>{this.props.data.name}</div>
                <div>{this.props.data.address}</div>
                <div>{this.props.data.phone}</div>
                <div>{this.props.data.avg_price}</div>
                {type}
                {area}
                <button onClick={this.selectStore.bind(this)}>想吃</button>
            </div>
        );
    }
};

export default Store;
