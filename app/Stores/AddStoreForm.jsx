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
            isRequest: false,
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

    handleSubmit(event) {
        event.preventDefault();
        Api.addStore(this.state.data, this.props.auth.token)
            .done((data) => {
                this.props.afterAdd();
            })
            .fail((data) => {
                console.log(data);
                this.setState({ isRequest: true });
            });
    }

    render() {
        let errMsg;
        if (this.state.isRequest) {
            errMsg = (<div>新增失敗</div>);
        }
        return (
            <div>
                <form id="add-store" onSubmit={this.handleSubmit.bind(this)}>
                    <label htmlFor="name">商家名稱</label>
                    <input type="text" name="name" placeholder="商家帳號" ref="name" onChange={this.handleChange.bind(this)} required />
                    <label htmlFor="address">地址</label>
                    <input type="text" name="address" placeholder="地址" ref="address" onChange={this.handleChange.bind(this)} required />
                    <label htmlFor="phone">電話</label>
                    <input type="tel" name="phone" placeholder="電話" ref="phone" onChange={this.handleChange.bind(this)} required />
                    <label htmlFor="price">平均價格</label>
                    <input type="number" name="price" min="0" placeholder="平均價格" ref="price" onChange={this.handleChange.bind(this)} required />
                    <label htmlFor="area">區域</label>
                    <select name="area" ref="area" onChange={this.handleChange.bind(this)} required>
                        {this.state.type.area.map((area) => <option key={area.id} value={area.id}>{area.name}</option>)}
                    </select>
                    <label htmlFor="storeType">食物類別</label>
                    <select name="storeType" ref="storeType" onChange={this.handleChange.bind(this)} required>
                        {this.state.type.store.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
                    </select>
                    <input type="submit" value="新增" onSubmit={this.handleSubmit.bind(this)} />
                </form>
                {errMsg}
            </div>
        );
    }
};

export default AddStoreForm;
