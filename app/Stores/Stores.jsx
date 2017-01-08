import React from 'react';
import Api from '../Api';
import Store from './Store';
import AddStoreForm from './AddStoreForm';

class Stores extends React.Component {
    constructor(props) {
        super(props);
        this.state = { page: 0 };
    }

    nextPage() {
        let page = this.state.page;
        if (this.props.storesData.length >= (page + 1) * 9 + 1) {
            page++;
            this.setState({ page });
        }
    }

    prevPage() {
        let page = this.state.page;
        if (page > 0) {
            page--;
            this.setState({ page });
        }
    }

    search(event) {
        event.preventDefault();
        this.props.search(this.refs.search.value);
    }

    showAddForm() {
        $('.add-store.form.modal').modal('show');
    }

    renderAddButton() {
        if (this.props.auth.isLogin) {
            return (
                <div className="ui blue animated button add-store" onClick={this.showAddForm.bind(this)}>
                    <div className="visible content">
                        <i className="large plus icon"></i>
                    </div>
                    <div className="hidden content">Add</div>
                </div>
            );
        }
    }

    renderAddForm() {
        if (this.props.auth.isLogin) {
            return <AddStoreForm auth={this.props.auth} updateStoreData={this.props.updateStoreData.bind(this)} />;
        }
    }

    renderStoresData() {
        return this.props.storesData.map((storeData, index) => {
            if (index >= this.state.page * 9 && index < (this.state.page + 1) * 9) {
                let storeProps = {
                    key: storeData.id,
                    auth: this.props.auth,
                    data: storeData,
                    favoriteList: this.props.favoriteList,
                    selectStore: this.props.selectStore.bind(this),
                    updateFavoriteList: this.props.updateFavoriteList.bind(this),
                    updateStoreData: this.props.updateStoreData.bind(this),
                    deleteStoreData: this.props.updateStoreData.bind(this)
                };
                return (<Store {...storeProps} />);
            }
        });
    }

    render() {
        const searchIconStyle = {
            'pointerEvents': 'auto'
        };
        return (
            <div className="stores">
                <div className="fluid ui olive fade animated button stores-up" onClick={this.prevPage.bind(this)} tabIndex="0">
                    <div className="hidden content">Prev</div>
                    <div className="visible content">
                        <i style={searchIconStyle} className="large angle double up icon"></i>
                    </div>
                </div>
                {this.renderAddButton()}
                {this.renderAddForm()}

                <div className="ui search">
                    <div className="ui icon input">
                        <input className="prompt" type="text" ref="search" placeholder="Search..." />
                        <i style={searchIconStyle} className="search icon" onClick={this.search.bind(this)}></i>
                    </div>
                    <div className="results"></div>
                </div>
                <div className="stores-inner">
                    {this.renderStoresData()}
                </div>
                <div className="fluid ui olive fade animated button stores-down" onClick={this.nextPage.bind(this)} tabIndex="0">
                    <div className="hidden content">Next</div>
                    <div className="visible content">
                        <i className="large angle double down icon"></i>
                    </div>
                </div>
            </div>
        );
    }
};

export default Stores;
