import React from 'react';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    unselectStore() {
        event.preventDefault();
        this.props.unselectStore(this.props.data);
    }

    render() {
        return (
            <li onClick={this.unselectStore.bind(this)}>{this.props.data.name}</li>
        );
    }
};

export default ListItem;