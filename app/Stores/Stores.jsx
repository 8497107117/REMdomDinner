import React from 'react';
import Api from '../Api';
import Store from './Store';
import AddStoreForm from './AddStoreForm';

class Stores extends React.Component {
    constructor(props) {
        super(props);
        this.state = { storesData: [], isAdd: false };
    }

    componentDidMount() {
        this.getStoresData();
    }

    getStoresData() {
        Api.getStoresData()
            .done((data) => {
                if (data)
                    this.setState({ storesData: data });
            });
    }

    showAddForm() {
        let isAdd = !this.state.isAdd;
        this.setState({ isAdd });
    }

    updateStoresData() {
        this.getStoresData();
        this.setState({ isAdd: false });
    }

    renderStoresData() {
        return this.state.storesData.map((storeData) => {
            let storeProps = {
                key: storeData.id,
                auth: this.props.auth,
                data: storeData,
                selectStore: this.props.selectStore.bind(this),
                afterUpdate: this.updateStoresData.bind(this),
                afterDelete: this.updateStoresData.bind(this)
            };
            return (<Store {...storeProps} />);
        });
    }

    render() {
        let addButton;
        let addForm;
        if (this.props.auth.isLogin) {
            addButton = <button onClick={this.showAddForm.bind(this)}>+</button>;
        }
        if (this.props.auth.isLogin && this.state.isAdd) {
            addForm = <AddStoreForm auth={this.props.auth} afterAdd={this.updateStoresData.bind(this)} />;
        }
        return (
            <div className="stores">
                <div className="stores-up">上</div>
                {addButton}
                {addForm}
                <div className="stores-inner">
                    {this.renderStoresData()}
                </div>
                <div className="stores-down">下</div>
            </div>
        );
    }
};

export default Stores;
