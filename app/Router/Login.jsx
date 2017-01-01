import React from 'react';
import Api from '../Api';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            username: this.refs.username.value,
            password: this.refs.password.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        Api.login(this.state)
            .done((data)=>{
                this.props.login(this.state, data);
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label htmlFor="username">使用者帳號</label>
                <input type="text" name="username" placeholder="請輸入使用者帳號" ref="username" onChange={this.handleChange.bind(this)} />
                <label htmlFor="password">密碼</label>
                <input type="password" name="password" placeholder="請輸入密碼" ref="password" onChange={this.handleChange.bind(this)} />
                <button onClick={this.handleSubmit.bind(this)}>登入</button>
            </form>
        );
    }
};

export default Login;