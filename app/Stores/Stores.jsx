import React from 'react';
import Api from '../Api';
import Store from './Store';
import AddStoreForm from './AddStoreForm';

class Stores extends React.Component {
    constructor(props) {
        super(props);
    }

    showAddForm() {
        $('.add-store.form.modal').modal('show');
    }

    updateStoreData() {
        this.props.updateStoreData();
    }

    renderAddButton() {
        if (this.props.auth.isLogin) {
            return <button onClick={this.showAddForm.bind(this)}>+</button>;
        }
    }

    renderAddForm() {
        if (this.props.auth.isLogin) {
            return <AddStoreForm auth={this.props.auth} updateStoreData={this.updateStoreData.bind(this)} />;
        }
    }

    renderStoresData() {
        return this.props.storesData.map((storeData) => {
            let storeProps = {
                key: storeData.id,
                auth: this.props.auth,
                data: storeData,
                selectStore: this.props.selectStore.bind(this),
                updateStoreData: this.updateStoreData.bind(this),
                deleteStoreData: this.updateStoreData.bind(this)
            };
            return (<Store {...storeProps} />);
        });
    }

    render() {
        return (
            <div className="stores">
                <div className="stores-up">上</div>
                {this.renderAddButton()}
                {this.renderAddForm()}
                <div className="stores-inner">
                    {this.renderStoresData()}
                </div>
                <div className="stores-down">下</div>
            </div>
        );
    }
};

export default Stores;
