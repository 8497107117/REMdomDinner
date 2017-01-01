import React from 'react';

class List extends React.Component {
    constructor(props) {
        super(props);
    }
    renderListItem() {
        if(this.props.storesData.length == 0){
            return (<li>none</li>);
        }
        return this.props.storesData.map((storeData) => {
            return (<li key={storeData.id}>{storeData.name}</li>);
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