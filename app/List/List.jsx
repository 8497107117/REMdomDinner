import React from 'react';
import Api from '../Api';
import FavoriteList from './FavoriteList';
import ListItem from './ListItem';

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $('.tab-thinking')
            .on('click', () => {
                $.tab('change tab', 'thinking');
            });
        $('.tab-favorite')
            .on('click', () => {
                $.tab('change tab', 'favorite');
            });
        $('.tab-thinking').trigger('click');
    }

    addFavoriteList(event) {
        event.preventDefault();
        Api.addFavoriteList(this.refs.listname.value, this.props.auth.token)
            .done((data) => {
                $('#add-list-form').val('');
                let sid = [];
                this.props.storesData.map((storeData) => {
                    sid.push(storeData.id);
                });
                Api.addStoreToFavoriteList(data.id.toString(), sid, this.props.auth.token)
                    .done(() => {
                        this.props.updateFavoriteList();
                    })
                    .fail((data) => { console.log(data) });
            })
            .fail(() => {
                $('#add-list-form').val('');
            });
    }

    renderFavoriteList() {
        if (this.props.favoriteListlength === 0) {
            return;
        }
        return this.props.favoriteList.map((list) => {
            let props = {
                auth: this.props.auth,
                key: list.listname_id,
                listName: list.listname,
                listNameId: list.listname_id,
                selectFavorite: this.props.selectFavorite.bind(this),
                storesData: list.storesData,
                updateFavoriteList: this.props.updateFavoriteList.bind(this)
            };
            return (<FavoriteList {...props} />);
        });
    }

    renderListButton() {
        if (this.props.storesData.length != 0) {
            let addFavoriteForm;
            if (this.props.auth.isLogin) {
                addFavoriteForm = (
                    <form id="add-list-form">
                        <div className="field">
                            <input type="text" name="listname" placeholder="最愛清單名稱" ref="listname" />
                        </div>
                        <button onClick={this.addFavoriteList.bind(this)}>加入最愛</button>
                    </form>
                );
            }
            return (
                <div>
                    <button onClick={this.props.randomDecide.bind(this)}>隨機</button>
                    <button onClick={this.props.resetRandom.bind(this)}>清除</button>
                    {addFavoriteForm}
                </div>
            );
        }
    }

    renderListItem() {
        if (this.props.storesData.length == 0) {
            return (<li>無選擇</li>);
        }
        return this.props.storesData.map((storeData) => {
            return (<ListItem key={storeData.id} data={storeData} unselectStore={this.props.unselectStore.bind(this)} />);
        });
    }

    renderRandomStore() {
        if (Object.keys(this.props.randomStore).length === 0 && this.props.randomStore.constructor === Object) {
            return <div>請選擇</div>;
        }
        else {
            return <div>去吃{this.props.randomStore.name}吧！</div>;
        }
    }

    render() {
        return (
            <div className="list">
                <button className="tab-thinking" data-tab="thinking">思考中</button>
                <button className="tab-favorite" data-tab="favorite">最愛</button>
                <div className="ui tab" data-tab="favorite">
                    {this.renderFavoriteList()}
                </div>
                <div className="ui tab" data-tab="thinking">
                    {this.renderRandomStore()}
                    {this.renderListButton()}
                    < ul >
                        {this.renderListItem()}
                    </ul >
                </div>
            </div>
        );
    }
};

export default List;
