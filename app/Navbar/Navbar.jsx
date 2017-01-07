import React from 'react';
import Login from './Login';
import Register from './Register';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    login(data, token) {
        this.props.login(data, token);
    }

    showLogin() {
        $('.ui.basic.login.form.modal').modal('show');
    }

    showRegister() {
        $('.ui.basic.register.form.modal').modal('show');
    }

    renderNav() {
        if (this.props.auth.isLogin) {
            return (
                <div className="menu">
                    <div className="menu-icon">
                        <a className="ui label">
                            <i className="huge list layout icon"></i>
                            Menu
                        </a>
                    </div>
                    <div className="inner-menu">
                        <div>吃晚餐囉 {this.props.auth.username}</div>
                        <a onClick={this.props.logout.bind(this)}>登出</a>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="menu">
                    <div className="menu-icon">
                        <a className="ui label">
                            <i className="huge list layout icon"></i>
                            Menu
                        </a>
                    </div>
                    <div className="inner-menu">
                        <div className="ui violet button login" onClick={this.showLogin.bind(this)}>登入</div>
                        <div className="ui purple button register" onClick={this.showRegister.bind(this)}>註冊</div>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <nav>
                <a>
                    <img src="assets/img/title.png" />
                </a>
                {this.renderNav()}
                <Login login={this.login.bind(this)} />
                <Register />
            </nav>
        );
    }
}

export default Navbar;
