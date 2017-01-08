import React from 'react';
import Api from '../Api';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: '',
                password: '',
                email: ''
            }
        };
    }

    componentDidMount() {
        $('.ui.basic.register.form.modal')
            .modal({
                allowMultiple: false,
                onApprove: () => {
                    Api.register(this.state.data)
                        .done((data) => {
                            this.clearInput();
                        })
                        .fail(() => {
                            $('.ui.small.basic.register.warning.modal').modal('show');
                        });
                },
                onDeny: () => {
                    this.clearInput();
                },
            });
        $('.ui.small.basic.register.warning.modal')
            .modal({
                allowMultiple: false,
                closable: false,
                onApprove: function () {
                    $('.ui.basic.register.form.modal').modal('show');
                }
            });
    }

    clearInput() {
        this.setState({
            data: {
                username: '',
                password: '',
                email: ''
            }
        });
        $(".ui.basic.register.form.modal input[type=text]").val('');
        $(".ui.basic.register.form.modal input[type=password]").val('');
        $(".ui.basic.register.form.modal input[type=email]").val('');
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            data: {
                username: this.refs.username.value,
                password: this.refs.password.value,
                email: this.refs.email.value
            }
        });
    }

    render() {
        return (
            <div>
                <form className="ui basic register form modal">
                    <div className="header">註冊</div>
                    <div className="field">
                        <label htmlFor="username">使用者帳號</label>
                        <input type="text" name="username" placeholder="請輸入使用者帳號" ref="username" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="field">
                        <label htmlFor="password">密碼</label>
                        <input type="password" name="password" placeholder="請輸入密碼" ref="password" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="field">
                        <label htmlFor="email">信箱</label>
                        <input type="email" name="email" placeholder="請輸入信箱" ref="email" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="actions">
                        <div className="two fluid ui inverted buttons">
                            <div className="ui ok green basic inverted button">
                                <i className="checkmark icon"></i>註冊
					        </div>
                            <div className="ui cancel red basic inverted button">
                                <i className="undo icon"></i>取消
					        </div>
                        </div>
                    </div>
                </form>
                <div className="ui small basic register warning modal">
                    <div className="header">註冊失敗</div>
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

export default Register;