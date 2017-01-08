import React from 'react';
import Api from '../Api';

class AddToFavoriteList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $(`.fav-store-${this.props.data.id}.modal`)
            .modal({
                allowMultiple: false,
                onApprove: () => {
                    Api.addStoreToFavoriteList(this.refs.favList.value, this.props.data.id, this.props.auth.token)
                        .done((data) => {
                            this.props.updateFavoriteList();
                        });
                }
            });
    }

    render() {
        let formClass = `ui basic fav-store-${this.props.data.id} modal`;
        return (
            <div>
                <form className={formClass}>
                    <div className="header">加到最愛清單</div>
                    <div className="field">
                        <label htmlFor="storeType">清單選擇</label>
                        <select name="favList" ref="favList" required>
                            {this.props.favoriteList.map((list, index) => <option key={index} value={list.listname_id}>{list.listname}</option>)}
                        </select>
                    </div>
                    <div className="actions">
                        <div className="two fluid ui inverted buttons">
                            <div className="ui ok green basic inverted button">
                                <i className="plus icon"></i>加入
					        </div>
                            <div className="ui cancel red basic inverted button">
                                <i className="undo icon"></i>取消
					        </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
};

export default AddToFavoriteList;
