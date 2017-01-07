import React from 'react';
import Login from './Login';
import Register from './Register';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: { login: false, register: false } };
    }

    login(data, token) {
        let isOpen = this.state.isOpen;
        isOpen.login = false;
        this.props.login(data, token);
        this.setState({ isOpen });
    }
    
    register() {
        let isOpen = this.state.isOpen;
        isOpen.register = false;
        this.setState({ isOpen });
    }

    showLogin() {
        let isOpen = this.state.isOpen;
        isOpen.login = !isOpen.login;
        this.setState({ isOpen });
    }
    
    showRegister() {
        let isOpen = this.state.isOpen;
        isOpen.register = !isOpen.register;
        this.setState({ isOpen });
    }

    renderLogin() {
        if (!this.props.auth.isLogin && this.state.isOpen.login) {
            return <Login login={this.login.bind(this)} />;
        }
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

    renderRegister() {
        if (!this.props.auth.isLogin && this.state.isOpen.register) {
            return <Register register={this.register.bind(this)} />;
        }
    }

    render() {
        let nav = this.renderNav();
        let login = this.renderLogin();
        let register = this.renderRegister();
        return (
            <nav>
                <a>
                  <img src="assets/img/title.png" />
                </a>
                {nav}
                {login}
                {register}
            </nav>
        );
    }
}

export default Navbar;
