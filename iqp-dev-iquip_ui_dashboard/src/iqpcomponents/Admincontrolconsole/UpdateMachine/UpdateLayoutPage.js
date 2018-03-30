import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import MaintenaceUpdatePage from './MaintenaceUpdatePage';


const ActiveLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <Link className={match ? 'active item' : 'item'} to={to}>{label}</Link>
  )} />
);

class UpdateLayoutPage extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui three item menu">
          <ActiveLink activeOnlyWhenExact to="/deletemachine"  />
          <ActiveLink activeOnlyWhenExact to="/deletemachine/games"  />
          <ActiveLink activeOnlyWhenExact to="/deletemachine/games/new"  />
        </div>

        <Route exact path="/updatemachine" component={MaintenaceUpdatePage} />
{/*//        <Route path="/updatemachine/games/new" component={MaintananceInfoForm} />
        <Route path="/updatemachine/game/:_id" component={MaintananceInfoForm} />*/}
      </div>
    );
  }
}

export default UpdateLayoutPage;
