import React from 'react';
import Api from '../Api';

class UpdateStoreForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: '',
                address: '',
                phone: '',
                avg_price: '',
                aid: '',
                tid: ''
            },
            type: {
                area: [],
                store: []
            }
        };
    }

    componentWillMount() {
        let data = {
            name: this.props.data.name.toString(),
            address: this.props.data.address.toString(),
            phone: this.props.data.phone.toString(),
            avg_price: this.props.data.avg_price.toString(),
            aid: this.props.data.area.toString(),
            tid: this.props.data.type.toString()
        };
        this.setState({ data });
    }

    componentDidMount() {
        Api.getAreaType()
            .done((area) => {
                let type = this.state.type;
                type.area = area;
                this.setState({ type });
            });
        Api.getStoresType()
            .done((store) => {
                let type = this.state.type;
                type.store = store;
                this.setState({ type });
            });
        $(`.update-store-${this.props.data.id}.form.modal`)
            .modal({
                allowMultiple: false,
                onApprove: () => {
                    Api.updateStore(this.state.data, this.props.data.id, this.props.auth.token)
                        .done((data) => {
                            this.props.updateStoreData();
                            this.clearInput();
                        })
                        .fail((data) => {
                            $(`.update-store-${this.props.data.id}.warning.modal`).modal('show');
                        });
                },
                onDeny: () => {
                    this.clearInput();
                }
            });
        $(`.update-store-${this.props.data.id}.warning.modal`)
            .modal({
                allowMultiple: false,
                closable: false,
                onApprove: () => {
                    $(`.update-store-${this.props.data.id}.form.modal`).modal('show');
                }
            });
    }

    clearInput() {
        this.setState({
            data: {
                name: '',
                address: '',
                phone: '',
                avg_price: '',
                aid: '',
                tid: ''
            }
        });
        $(`.update-store-${this.props.data.id}.form.modal input`).val('');
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            data: {
                name: this.refs.name.value,
                address: this.refs.address.value,
                phone: this.refs.phone.value,
                avg_price: this.refs.price.value,
                aid: this.refs.area.value,
                tid: this.refs.storeType.value
            }
        });
    }

    render() {
        let formClass = `ui basic update-store-${this.props.data.id} form modal`;
        let warningClass = `ui small basic update-store-${this.props.data.id} warning modal`;
        return (
            <div>
                <form className={formClass}>
                    <div className="header">更新商家</div>
                    <div className="field">
                        <label htmlFor="name">商家名稱</label>
                        <input type="text" name="name" defaultValue={this.props.data.name} placeholder="商家帳號" ref="name" onChange={this.handleChange.bind(this)} required />
                    </div>
                    <div className="field">
                        <label htmlFor="address">地址</label>
                        <input type="text" name="address" defaultValue={this.props.data.address} placeholder="地址" ref="address" onChange={this.handleChange.bind(this)} required />
                    </div>
                    <div className="field">
                        <label htmlFor="phone">電話</label>
                        <input type="tel" name="phone" defaultValue={this.props.data.phone} placeholder="電話" ref="phone" onChange={this.handleChange.bind(this)} required />
                    </div>
                    <div className="field">
                        <label htmlFor="price">平均價格</label>
                        <input type="number" name="price" defaultValue={this.props.data.avg_price} min="0" placeholder="平均價格" ref="price" onChange={this.handleChange.bind(this)} required />
                    </div>
                    <div className="field">
                        <label htmlFor="area">區域</label>
                        <select name="area" defaultValue={this.props.data.aid} value={this.state.data.aid} ref="area" onChange={this.handleChange.bind(this)} required>
                            {this.state.type.area.map((area) => <option key={area.id} value={area.id}>{area.name}</option>)}
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="storeType">食物類別</label>
                        <select name="storeType" defaultValue={this.props.data.tid} value={this.state.data.tid} ref="storeType" onChange={this.handleChange.bind(this)} required>
                            {this.state.type.store.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
                        </select>
                    </div>
                    <div className="actions">
                        <div className="two fluid ui inverted buttons">
                            <div className="ui ok green basic inverted button">
                                <i className="checkmark icon"></i>更新
					        </div>
                            <div className="ui cancel red basic inverted button">
                                <i className="undo icon"></i>取消
					        </div>
                        </div>
                    </div>
                </form>
                <div className={warningClass}>
                    <div className="header">更新失敗</div>
                    <div className="actions">
                        <div className="fluid ui inverted buttons">
                            <div className="ui ok green basic inverted button">
                                <i className="checkmark icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default UpdateStoreForm;
