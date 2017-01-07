import React from 'react';
import Api from '../Api';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: '',
                password: ''
            }
        };
    }

    componentDidMount() {
        $('.ui.basic.login.form.modal')
            .modal({
                allowMultiple: false,
                onApprove: () => {
                    Api.login(this.state.data)
                        .done((data) => {
                            this.props.login(this.state.data, data.token);
                            this.clearInput();
                        })
                        .fail(() => {
                            $('.ui.small.basic.login.warning.modal').modal('show');
                        });
                },
                onDeny: () => {
                    this.clearInput();
                },
            });
        $('.ui.small.basic.login.warning.modal')
            .modal({
                allowMultiple: false,
                closable: false,
                onApprove: () => {
                    $('.ui.basic.login.form.modal').modal('show');
                }
            });
    }

    clearInput() {
        this.setState({
            data: {
                username: '',
                password: ''
            }
        });
        $(".ui.basic.login.form.modal input[type=text]").val('');
        $(".ui.basic.login.form.modal input[type=password]").val('');
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

    render() {
        return (
            <div>
                <div className="ui basic login form modal">
                    <div className="header">登入</div>
                    <div className="ui input">
                        <label htmlFor="username">使用者帳號</label>
                        <input type="text" name="username" placeholder="請輸入使用者帳號" ref="username" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="ui input">
                        <label htmlFor="password">密碼</label>
                        <input type="password" name="password" placeholder="請輸入密碼" ref="password" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="actions">
                        <div className="two fluid ui inverted buttons">
                            <div className="ui ok green basic inverted button">
                                <i className="checkmark icon"></i>登入
					        </div>
                            <div className="ui cancel red basic inverted button">
                                <i className="undo icon"></i>取消
					        </div>
                        </div>
                    </div>
                </div>
                <div className="ui small basic login warning modal">
                    <div className="header">登入失敗</div>
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

export default Login;
