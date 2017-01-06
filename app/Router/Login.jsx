import React from 'react';
import { hashHistory } from 'react-router';
import Api from '../Api';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: '',
                password: ''
            },
            isRequest: false
        };
    }

    componentWillMount() {
        if (this.props.auth.isLogin) {
            hashHistory.goBack();
        }
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            data: {
                username: this.refs.username.value,
                password: this.refs.password.value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        Api.login(this.state.data)
            .done((data) => {
                this.props.login(this.state.data, data.token);
                hashHistory.push('/');
            })
            .fail(() => {
                $("input[type=text]").val('');
                $("input[type=password]").val('');
                this.setState({
                    data: {
                        username: '',
                        password: ''
                    },
                    isRequest: true
                });
            });
    }

    render() {
        let errMsg;
        if (this.state.isRequest) {
            errMsg = (<div>登入失敗</div>);
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label htmlFor="username">使用者帳號</label>
                    <input type="text" name="username" placeholder="請輸入使用者帳號" ref="username" onChange={this.handleChange.bind(this)} />
                    <label htmlFor="password">密碼</label>
                    <input type="password" name="password" placeholder="請輸入密碼" ref="password" onChange={this.handleChange.bind(this)} />
                    <button onClick={this.handleSubmit.bind(this)}>登入</button>
                </form>
                {errMsg}
            </div>
        );
    }
};

export default Login;