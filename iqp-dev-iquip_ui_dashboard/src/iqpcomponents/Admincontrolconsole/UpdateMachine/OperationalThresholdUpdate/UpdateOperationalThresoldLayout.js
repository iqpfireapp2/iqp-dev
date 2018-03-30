import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import UpdateOperationalThresholdPage from './UpdateOperationalThresholdPage';
import UpdateOperationalThresholdFormPage from './UpdateOperationalThresholdFormPage';


const ActiveLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <Link className={match ? 'active item' : 'item'} to={to}>{label}</Link>
  )} />
);

class UpdateOperationalThresoldLayout extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui three item menu">
          <ActiveLink activeOnlyWhenExact to="/operatthreupdate" label="MachineDetails"/>
          <ActiveLink activeOnlyWhenExact to="/operatthreupdate" label="MachineUpdate" />
          <ActiveLink activeOnlyWhenExact to="/operatthreupdate/new" />
        </div>

        <Route exact path="/operatthreupdate" component={UpdateOperationalThresholdPage} />
        <Route path="/operatthreupdate/new" component={UpdateOperationalThresholdFormPage} />
        <Route path="/operatthreupdate/:_id" component={UpdateOperationalThresholdFormPage} />
      </div>
    );
  }
}

export default UpdateOperationalThresoldLayout;
