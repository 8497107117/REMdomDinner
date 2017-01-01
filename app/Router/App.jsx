import React from 'react';
import Navbar from './Navbar';
import Login from './Login';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { auth: { isLogin: false } };
    }

    login(data, token) {
        this.setState({
            auth: {
                isLogin: true,
                username: data.username,
                token
            }
        });
    }

    renderChildren(children) {
        return React.Children.map(children, (child) => {
            if (child.type === Login)
                return React.cloneElement(child, {
                    login: this.login
                })
            else {
                return child;
            }
        })
    }

    render() {
        return (
            <div>
                <Navbar />
                {this.renderChildren(this.props.children)}
            </div>
        );
    }
};

export default App;