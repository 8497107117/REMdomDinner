import React from 'react';
import Navbar from './Navbar/Navbar';
import Stores from './Stores/Stores';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { auth: { isLogin: false }, selectedStore: [] };
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

    selectStore(data) {
        let selectedStore = this.state.selectedStore;
        let isSelected = false;

        for (let i = 0; i < selectedStore.length; i++) {
            if (selectedStore[i].id == data.id) {
                isSelected = true;
                break;
            }
        }
        if (!isSelected) {
            selectedStore.push(data);
            this.setState({ selectedStore });
        }
    }

    renderChildren(children) {
        return React.Children.map(children, (child) => {
            if (child.type === Login) {
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
                <Navbar auth={this.state.auth} login={this.login.bind(this)} logout={this.logout.bind(this)} />
                <div className="container">
                    <Stores auth={this.state.auth} selectStore={this.selectStore.bind(this)} />
                </div>
            </div>
        );
    }
};

export default App;