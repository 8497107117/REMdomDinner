import React from 'react';
import Api from '../Api';
import UpdateStoreForm from './UpdateStoreForm';

class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false, isUpdate: false };
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.isLogin) {
            this.setState({ isOpen: false, isUpdate: false });
        }
    }

    afterUpdate() {
        this.props.afterUpdate();
        this.setState({ isUpdate: false });
    }

    closeStoreInfo() {
        this.setState({ isOpen: false });
    }

    deleteStore() {
        Api.deleteStore(this.props.data.id, this.props.auth.token)
            .done((data) => {
                this.props.afterDelete();
            });
    }

    selectStore(event) {
        event.preventDefault();
        this.props.selectStore(this.props.data);
    }

    showStoreInfo() {
        this.setState({ isOpen: true });
    }

    showUpdateForm() {
        let isUpdate = !this.state.isUpdate;
        this.setState({ isUpdate });
    }

    renderModifyButton() {
        let modifyButton;
        if (this.props.auth.isLogin && this.props.auth.username == this.props.data.provide_by) {
            modifyButton = (
                <div>
                    <button onClick={this.showUpdateForm.bind(this)}>修改</button>
                    <button onClick={this.deleteStore.bind(this)}>刪除</button>
                </div>
            );
        }
        return modifyButton;
    }

    renderStoreInfoOrForm() {
        let storeInfoOrForm;
        let type = this.props.data.type ? <div>{this.props.data.type__name}</div> : <div>無</div>;
        let area = this.props.data.area ? <div>{this.props.data.area__name}</div> : <div>無</div>;
        if (this.state.isOpen && !this.state.isUpdate) {
            storeInfoOrForm = (
                <div>
                    <button onClick={this.closeStoreInfo.bind(this)}>關閉</button>
                    <div>{this.props.data.name}</div>
                    <div>{this.props.data.address}</div>
                    <div>{this.props.data.phone}</div>
                    <div>{this.props.data.avg_price}</div>
                    {type}
                    {area}
                    <div>{this.props.data.provide_by}</div>
                    {this.renderModifyButton()}
                </div>
            );
        }
        else if (this.state.isOpen && this.state.isUpdate && this.props.auth.isLogin) {
            storeInfoOrForm = (
                <div>
                    <button onClick={this.showUpdateForm.bind(this)}>關閉</button>
                    <UpdateStoreForm auth={this.props.auth} data={this.props.data} afterUpdate={this.afterUpdate.bind(this)} />
                </div>
            );
        }
        return storeInfoOrForm;
    }

    renderUpdateForm() {
        let updateForm;
        if (this.state.isUpdate) {
            updateForm = <div>FFFF</div>;
        }

        return updateForm;
    }

    render() {
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
                {this.renderStoreInfoOrForm()}
            </div>
        );
    }
};

export default Store;
