import React from 'react';
import Navbar from './Navbar';
import Login from './Login';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { auth: { isLogin: false } };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth !== null) {
            if (auth.isLogin) {
                this.setState({ auth });
            }
        }
    }

    login(data, token) {
        this.setState({
            auth: {
                isLogin: true,
                username: data.username,
                token
            }
        });
        localStorage.setItem('auth', JSON.stringify(this.state.auth));
    }

    logout() {
        this.setState({ auth: { isLogin: false } });
        localStorage.clear();
    }

    renderChildren(children) {
        return React.Children.map(children, (child) => {
            if (child.type === Login){
                return React.cloneElement(child, {
                    login: this.login,
                    auth: this.state.auth
                });
            }
            else {
                return React.cloneElement(child, {
                    auth: this.state.auth
                });
            }
        })
    }

    render() {
        return (
            <div>
                <Navbar auth={this.state.auth} logout={this.logout} />
                {this.renderChildren(this.props.children)}
            </div>
        );
    }
};

export default App;