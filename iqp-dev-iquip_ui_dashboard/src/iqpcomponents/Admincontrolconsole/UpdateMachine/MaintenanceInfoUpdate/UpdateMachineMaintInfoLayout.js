import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import UpdateMaintenanceInfoPage from './UpdateMaintenanceInfoPage';
import UpdateMaintenanceInfoFormPage from './UpdateMaintenanceInfoFormPage';


const ActiveLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <Link className={match ? 'active item' : 'item'} to={to}>{label}</Link>
  )} />
);

class UpdateMachineMaintInfoLayout extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui three item menu">
          <ActiveLink activeOnlyWhenExact to="/maintinfoupdate" label="MachineDetails" />
          <ActiveLink activeOnlyWhenExact to="/maintinfoupdate" label="MachineUpdate" />
          <ActiveLink activeOnlyWhenExact to="/maintinfoupdate/new"  />
        </div>

        <Route exact path="/maintinfoupdate" component={UpdateMaintenanceInfoPage} />
        <Route path="/maintinfoupdate/new" component={UpdateMaintenanceInfoFormPage} />
        <Route path="/maintinfoupdate/:_id" component={UpdateMaintenanceInfoFormPage} />
      </div>
    );
  }
}

export default UpdateMachineMaintInfoLayout;
