import React from 'react';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    unselected() {
        event.preventDefault();
        this.props.unselected(this.props.data);
    }

    render() {
        return (
            <li onClick={this.unselected.bind(this)}>{this.props.data.name}</li>
        );
    }
};

export default ListItem;