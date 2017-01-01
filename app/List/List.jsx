import React from 'react';

import ListItem from './ListItem';

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    renderListItem() {
        if (this.props.storesData.length == 0) {
            return (<li>none</li>);
        }
        return this.props.storesData.map((storeData) => {
            return (<ListItem key={storeData.id} data={storeData} unselected={this.props.unselected.bind(this)} />);
        });
    }

    render() {
        return (
            <ul>
                {this.renderListItem()}
            </ul>
        );
    }
};

export default List;