import React from 'react';
import Api from '../Api';
import AddToFavoriteList from './AddToFavoriteList';
import UpdateStoreForm from './UpdateStoreForm';

class Store extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $(`.store-${this.props.data.id}.info.modal`)
            .modal({
                allowMultiple: false,
                onApprove: () => {
                    this.showUpdateForm();
                },
                onDeny: () => {
                    this.deleteStore();
                }
            });
    }

    deleteStore() {
        Api.deleteStore(this.props.data.id, this.props.auth.token)
            .done((data) => {
                this.props.deleteStoreData();
            });
    }

    selectStore(event) {
        event.preventDefault();
        this.props.selectStore(this.props.data);
    }

    showAddToFavoriteList() {
        $(`.fav-store-${this.props.data.id}.modal`).modal('show');
    }

    showStoreInfo() {
        $(`.store-${this.props.data.id}.info.modal`).modal('show');
    }

    showUpdateForm() {
        $(`.update-store-${this.props.data.id}.form.modal`).modal('show');
    }

    renderAddToFavoriteList() {
        if (this.props.auth.isLogin) {
            let props = {
                auth: this.props.auth,
                data: this.props.data,
                favoriteList: this.props.favoriteList,
                updateFavoriteList: this.props.updateFavoriteList.bind(this)
            }
            return <AddToFavoriteList {...props} />;
        }
    }

    renderModifyButton() {
        if (this.props.auth.isLogin && this.props.auth.username == this.props.data.provide_by) {
            return (
                <div className="actions">
                    <div className="two fluid ui inverted buttons">
                        <div className="ui ok green basic inverted button">
                            <i className="refresh icon"></i>修改
					        </div>
                        <div className="ui cancel red basic inverted button">
                            <i className="remove icon"></i>刪除
					        </div>
                    </div>
                </div>
            );
        }
    }

    renderStoreInfo() {
        let storeClass = `ui basic store-${this.props.data.id} info modal`;
        let type = this.props.data.type ? <div>{this.props.data.type__name}</div> : <div>無</div>;
        let area = this.props.data.area ? <div>{this.props.data.area__name}</div> : <div>無</div>;
        return (
            <div>
                <div className={storeClass}>
                    <div className="header">{this.props.data.name}</div>
                    <div className="content">
                        <div>{this.props.data.address}</div>
                        <div>{this.props.data.phone}</div>
                        <div>{this.props.data.avg_price}</div>
                        {type}
                        {area}
                        <div>{this.props.data.provide_by}</div>
                    </div>
                    {this.renderModifyButton()}
                </div>
            </div>
        );

    }

    renderUpdateForm() {
        if (this.props.auth.isLogin && this.props.auth.username == this.props.data.provide_by) {
            return <UpdateStoreForm auth={this.props.auth} data={this.props.data} updateStoreData={this.props.updateStoreData.bind(this)} />;
        }
    }

    render() {
        return (
            <div className="store">
                <div>
                    <div>{this.props.data.name}</div>
                    <img src={this.props.data.url} alt={this.props.data.name} />
                </div>
                <div className="add" onClick={this.selectStore.bind(this)}>
                    <i className="checkmark box icon large"></i>
                </div>
                <div className="favorite" onClick={this.showAddToFavoriteList.bind(this)}>
                    <i className="empty heart icon large"></i>
                </div>
                <div className="details" onClick={this.showStoreInfo.bind(this)}>
                    <i className="ellipsis horizontal icon large"></i>
                </div>
                {this.renderAddToFavoriteList()}
                {this.renderStoreInfo()}
                {this.renderUpdateForm()}
            </div>
        );
    }
};

export default Store;
