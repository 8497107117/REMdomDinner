import React from 'react';

class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
    }

    selectStore(event) {
        event.preventDefault();
        this.props.selectStore(this.props.data);
    }

    showStoreInfo() {
        let isOpen = !this.state.isOpen;
        this.setState({ isOpen });
    }

    render() {
        let storeInfo;
        let type = this.props.data.type ? <div>{this.props.data.type__name}</div> : <div>無</div>;
        let area = this.props.data.area ? <div>{this.props.data.area__name}</div> : <div>無</div>;
        if (this.state.isOpen) {
            storeInfo = (
                <div>
                    <button onClick={this.showStoreInfo.bind(this)}>關閉</button>
                    <div>{this.props.data.name}</div>
                    <div>{this.props.data.address}</div>
                    <div>{this.props.data.phone}</div>
                    <div>{this.props.data.avg_price}</div>
                    {type}
                    {area}
                </div>
            );
        }
        return (
            <div className="store">
                <div>
                    <div>{this.props.data.name}</div>
                    <img src={this.props.data.url} alt={this.props.data.name} />
                </div>
                <div>
                    <button onClick={this.selectStore.bind(this)}>想吃</button>
                    <button onClick={this.showStoreInfo.bind(this)}>商家資訊</button>
                </div>
                {storeInfo}
            </div>
        );
    }
};

export default Store;
