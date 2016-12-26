import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class List extends React.Component {
    constructor(props) {
        super(props);
    }
    renderListItem() {
        if(this.props.storesData.length == 0){
            return (<ListGroupItem header="None">none</ListGroupItem>);
        }
        return this.props.storesData.map((storeData) => {
            return (<ListGroupItem key={storeData.id} header={storeData.name}>{storeData.name}</ListGroupItem>);
        });
    }

    render() {
        return (
            <ListGroup>
                {this.renderListItem()}
            </ListGroup>
        );
    }
};

export default List;