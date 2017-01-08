import React from 'react';
import Api from '../Api';

class AddStoreForm extends React.Component {
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
        $('.ui.basic.add-store.form.modal')
            .modal({
                allowMultiple: false,
                onApprove: () => {
                    Api.addStore(this.state.data, this.props.auth.token)
                        .done((data) => {
                            this.props.afterAdd();
                            this.clearInput();
                        })
                        .fail(() => {
                            $('.ui.small.basic.add-store.warning.modal').modal('show');
                        });
                },
                onDeny: () => {
                    this.clearInput();
                },
            });
        $('.ui.small.basic.add-store.warning.modal')
            .modal({
                allowMultiple: false,
                closable: false,
                onApprove: () => {
                    $('.ui.basic.add-store.form.modal').modal('show');
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
        $(".ui.basic.add-store.form.modal input").val('');
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
        return (
            <div>
                <form className="ui basic add-store form modal">
                    <div className="header">新增商家</div>
                    <div className="field">
                        <label htmlFor="name">商家名稱</label>
                        <input type="text" name="name" placeholder="商家帳號" ref="name" onChange={this.handleChange.bind(this)} required />
                    </div>
                    <div className="field">
                        <label htmlFor="address">地址</label>
                        <input type="text" name="address" placeholder="地址" ref="address" onChange={this.handleChange.bind(this)} required />
                    </div>
                    <div className="field">
                        <label htmlFor="phone">電話</label>
                        <input type="tel" name="phone" placeholder="電話" ref="phone" onChange={this.handleChange.bind(this)} required />
                    </div>
                    <div className="field">
                        <label htmlFor="price">平均價格</label>
                        <input type="number" name="price" min="0" placeholder="平均價格" ref="price" onChange={this.handleChange.bind(this)} required />
                    </div>
                    <div className="field">
                        <label htmlFor="area">區域</label>
                        <select name="area" ref="area" onChange={this.handleChange.bind(this)} required>
                            {this.state.type.area.map((area) => <option key={area.id} value={area.id}>{area.name}</option>)}
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="storeType">食物類別</label>
                        <select name="storeType" ref="storeType" onChange={this.handleChange.bind(this)} required>
                            {this.state.type.store.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
                        </select>
                    </div>
                    <div className="actions">
                        <div className="two fluid ui inverted buttons">
                            <div className="ui ok green basic inverted button">
                                <i className="checkmark icon"></i>新增
					        </div>
                            <div className="ui cancel red basic inverted button">
                                <i className="undo icon"></i>取消
					        </div>
                        </div>
                    </div>
                </form>
                <div className="ui small basic add-store warning modal">
                    <div className="header">新增失敗</div>
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

export default AddStoreForm;
