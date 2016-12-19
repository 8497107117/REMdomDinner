import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const NavbarInstance = () => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#/">REMdomDinner</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#/">未定</NavItem>
        <NavItem eventKey={2} href="#/">未定</NavItem>
      </Nav>
      <Nav pullRight>
        <NavDropdown eventKey={3} title="未定" id="tool">
          <MenuItem header>未定</MenuItem>
          <MenuItem eventKey={3.1} href="#/未定">未定</MenuItem>
          <MenuItem divider />
          <MenuItem header>未定</MenuItem>
          <MenuItem eventKey={3.1}>???</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavbarInstance;