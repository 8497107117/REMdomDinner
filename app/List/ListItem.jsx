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
            <li>
                <div>
                    {this.props.data.name}
                </div>
                <button onClick={this.unselectStore.bind(this)}></button>
            </li>
        );
    }
};

export default ListItem;