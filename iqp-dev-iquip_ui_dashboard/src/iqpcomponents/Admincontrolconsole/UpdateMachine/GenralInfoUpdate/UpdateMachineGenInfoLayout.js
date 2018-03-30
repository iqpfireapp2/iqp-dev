import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import UpdateGeneralInfoPage from './UpdateGeneralInfoPage';
import UpadateGeneralInfoFormPage from './UpadateGeneralInfoFormPage';


const ActiveLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <Link className={match ? 'active item' : 'item'} to={to}>{label}</Link>
  )} />
);

class UpdateMachineGenInfoLayout extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui three item menu">
          <ActiveLink activeOnlyWhenExact to="/geninfoupdate" label="MachineDetails" />
          <ActiveLink activeOnlyWhenExact to="/geninfoupdate" label="MachineUpdate" />
          <ActiveLink activeOnlyWhenExact to="/geninfoupdate/:_id"  />
        </div>

        <Route exact path="/geninfoupdate" component={UpdateGeneralInfoPage} />
        <Route path="/geninfoupdate/new" component={UpdateGeneralInfoPage} />
        <Route path="/geninfoupdate/:_id" component={UpadateGeneralInfoFormPage} />
      </div>
    );
  }
}

export default UpdateMachineGenInfoLayout;
