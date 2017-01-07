import React from 'react';
import Api from './Api';
import Navbar from './Navbar/Navbar';
import List from './List/List';
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

    componentDidMount() {
        if (this.state.auth.isLogin) {
            this.interval = setInterval(() => this.refreshToken(), 300000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
        this.interval = setInterval(() => this.refreshToken(), 300000);
    }

    logout() {
        this.setState({ auth: { isLogin: false } });
        localStorage.clear();
        clearInterval(this.interval);
    }

    refreshToken() {
        Api.refreshToken(this.state.auth.token)
            .done((data) => {
                let auth = this.state.auth;
                auth.token = data.token;
                this.setState({ auth });
                localStorage.setItem('auth', JSON.stringify(this.state.auth));
            });
    }

    restSelected() {
        this.setState({ selectedStore: [] });
    }

    selectFavorite(storesData) {
        let selectedStore = this.state.selectedStore;
        storesData.map((storeData) => {
            this.selectStore(storeData);
        });
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

    unselectStore(data) {
        let selectedStore = this.state.selectedStore;
        let isSelected = false;
        let key = -1;

        for (let i = 0; i < selectedStore.length; i++) {
            if (selectedStore[i].id == data.id) {
                key = i;
                isSelected = true;
                break;
            }
        }
        if (isSelected) {
            selectedStore.splice(key, 1)
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
                    <List auth={this.state.auth} selectFavorite={this.selectFavorite.bind(this)} unselectStore={this.unselectStore.bind(this)} resetSelected={this.restSelected.bind(this)} storesData={this.state.selectedStore} />
                    <Stores auth={this.state.auth} selectStore={this.selectStore.bind(this)} />
                </div>
            </div>
        );
    }
};

export default App;