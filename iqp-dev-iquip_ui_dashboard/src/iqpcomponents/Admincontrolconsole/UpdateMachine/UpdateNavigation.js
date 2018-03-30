import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import GamesPage from './GamesPage';
import GameFormPage from './GameFormPage';
import { Nav, NavItem, NavLink } from 'reactstrap';

class UpdateNavigation extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui three item menu">
     <p>Update Machine</p>
        <Nav>
          <NavItem>
            <NavLink href="#">Machine Layout</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">General Info Update</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Operational Threshold Update</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">Maintanance Info Update</NavLink>
          </NavItem>
        </Nav>
        <hr />
        <p>Link Based</p>
        <Nav>
          <NavLink href="#">Link</NavLink> <NavLink href="#">Link</NavLink> <NavLink href="#">Another Link</NavLink> <NavLink disabled href="#">Disabled Link</NavLink>
        </Nav>
                  
      </div>

      </div>
    );
  }
}

export default UpdateNavigation;
