import React from 'react';
import Api from './Api';
import Navbar from './Navbar/Navbar';
import List from './List/List';
import Stores from './Stores/Stores';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: { isLogin: false },
            favoriteList: [],
            randomStore: {},
            selectedStore: [],
            storesData: []
        };
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
        this.getStoresData();
        if (this.state.auth.isLogin) {
            this.getFavoriteLists();
            this.interval = setInterval(() => this.refreshToken(), 300000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getFavoriteLists() {
        Api.getFavoriteLists(this.state.auth.token)
            .done((favoriteList) => {
                this.setState({ favoriteList });
            });
    }

    getStoresData() {
        Api.getStoresData()
            .done((data) => {
                this.setState({ storesData: data });
            });
        /* update selected */
    }

    login(data, token) {
        this.setState({
            auth: {
                isLogin: true,
                username: data.username,
                token
            }
        });
        this.getFavoriteLists();
        localStorage.setItem('auth', JSON.stringify(this.state.auth));
        this.interval = setInterval(() => this.refreshToken(), 300000);
    }

    logout() {
        this.setState({ auth: { isLogin: false }, favoriteList: [] });
        localStorage.clear();
        clearInterval(this.interval);
    }

    randomDecide() {
        let randomStore = this.state.selectedStore[Math.floor(Math.random() * this.state.selectedStore.length)];
        this.setState({ randomStore });
        $('.random-result').modal('show');
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

    resetRandom() {
        this.setState({ randomStore: {} });
        this.setState({ selectedStore: [] });
    }

    search(keyword) {
        Api.getStoresData(keyword)
            .done((data) => {
                this.setState({ storesData: data });
            });
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

    render() {
        let listProps = {
            auth: this.state.auth,
            update: this.getFavoriteLists.bind(this),
            favoriteList: this.state.favoriteList,
            randomDecide: this.randomDecide.bind(this),
            randomStore: this.state.randomStore,
            resetRandom: this.resetRandom.bind(this),
            selectFavorite: this.selectFavorite.bind(this),
            storesData: this.state.selectedStore,
            unselectStore: this.unselectStore.bind(this),
            updateFavoriteList: this.getFavoriteLists.bind(this)
        };
        let storesProps = {
            auth: this.state.auth,
            favoriteList: this.state.favoriteList,
            updateFavoriteList: this.getFavoriteLists.bind(this),
            updateStoreData: this.getStoresData.bind(this),
            search: this.search.bind(this),
            selectStore: this.selectStore.bind(this),
            storesData: this.state.storesData
        }
        return (
            <div>
                <Navbar auth={this.state.auth} login={this.login.bind(this)} logout={this.logout.bind(this)} />
                <div className="container">
                    <List {...listProps} />
                    <Stores {...storesProps} />
                </div>
            </div>
        );
    }
};

export default App;