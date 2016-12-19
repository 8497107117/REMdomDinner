import React from 'react';

class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isSelected: false };
    }

    componentWillMount() {
        this.setState({ isSelected: false });
    }

    selectStore(event) {
        event.preventDefault();
        this.props.selectStore(this.props.data, !this.state.isSelected);
        this.setState({ isSelected: !this.state.isSelected });
    }

    render() {
        return (
            <figure onClick={this.selectStore.bind(this)}>
                <figcaption>{this.props.data.name}</figcaption>
                <img src="" alt={this.props.data.name} />
            </figure>
        );
    }
};

export default Store;