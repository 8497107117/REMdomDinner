import React from 'react';
import Api from '../Api';

class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
    }

    deleteStore() {
        Api.deleteStore(this.props.data.id, this.props.auth.token)
            .done((data)=>{
                this.props.afterDelete();
            });
    }

    selectStore(event) {
        event.preventDefault();
        this.props.selectStore(this.props.data);
    }

    showStoreInfo() {
        let isOpen = !this.state.isOpen;
        this.setState({ isOpen });
    }

    renderModifyButton() {
        let modifyButton;
        if (this.props.auth.isLogin && this.props.auth.username == this.props.data.provide_by) {
            modifyButton = (
                <div>
                    <button>修改</button>
                    <button onClick={this.deleteStore.bind(this)}>刪除</button>
                </div>
            );
        }
        return modifyButton;
    }

    renderStoreInfo() {
        let storeInfo;
        let type = this.props.data.type ? <div>{this.props.data.type__name}</div> : <div>無</div>;
        let area = this.props.data.area ? <div>{this.props.data.area__name}</div> : <div>無</div>;
        let modifyButton = this.renderModifyButton();
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
                    <div>{this.props.data.provide_by}</div>
                    {modifyButton}
                </div>
            );
        }
        return storeInfo;
    }

    render() {
        let storeInfo = this.renderStoreInfo();
        return (
            <div className="store">
                <div onClick={this.showStoreInfo.bind(this)}>
                    <div>{this.props.data.name}</div>
                    <img src={this.props.data.url} alt={this.props.data.name} />
                </div>
                <div>
                    <button onClick={this.selectStore.bind(this)}>想吃</button>
                    <button>加入最愛</button>
                </div>
                {storeInfo}
            </div>
        );
    }
};

export default Store;
