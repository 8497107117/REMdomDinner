import React from 'react';

class NavbarInstance extends React.Component {
  render() {
    let log = this.props.auth.isLogin ?
      (
        <div className="menu">
          <div>吃晚餐囉 {this.props.auth.username}</div>
          <a href="#/" onClick={this.props.logout.bind(this)}>登出</a>
        </div>
      ) :
      (
        <div className="menu">
          <a href="#/auth/login">登入</a>
          <a href="#/auth/register">註冊</a>
        </div>
      );
    return (
      <nav>
        <a href="#/">
            <img src="../assets/img/title.png" />
        </a>
        {log}
      </nav>
    );
  }
}

export default NavbarInstance;
