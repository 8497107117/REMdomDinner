import React from 'react';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    unselectStore() {
        event.preventDefault();
        this.props.unselectStore(this.props.data);
    }

    showStoreInfo() {
        $(`.store-${this.props.data.id}.info.modal`).modal('show');
    }

    render() {
        return (
            <li>
                <div onClick={this.showStoreInfo.bind(this)}>
                    {this.props.data.name}
                </div>
                <div className="shake-ani">
                    <div className="list-remove-icon" onClick={this.unselectStore.bind(this)}></div>
                </div>
            </li>
        );
    }
};

export default ListItem;
