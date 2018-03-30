import React, {Component} from 'react';
import {Badge, Dropdown, DropdownMenu, DropdownItem, Nav, NavItem, NavLink, NavbarToggler, NavbarBrand, TabContent, DropdownToggle} from 'reactstrap';

import {getUserNotification} from '../../../../actions/actions';
import {connect} from "react-redux";
import PropTypes from "prop-types";

var alerts = require('./../alert/alert.json');

class Maintenance extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notiDropdownOpen: false,
      userDropdownOpen: false,
      alerts: alerts
    };
  }

  componentDidMount() {
    if(!(Object.keys(this.props.allNotifications).length > 0)) {
      this.props.getUserNotification("U001");
    }
  }

  componentWillReceiveProps() {
    console.log(this.props.allNotifications, this.props.notification);
  }

  toggle(name) {
    this.setState({
      [name]: !this.state[name]
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  changeTab(index) {
    if (this.state.activeTab !== index) {
      this.setState({activeTab: index});
    }
  }

  render() {
    return (
      <div>
        {this.state.alerts.map(function (alert, i) {
          if (alert.name === "alert") {
            return (
              <DropdownItem key={i}>{alert.a.content}<span className={`badge ${alert.a.span.className}`}> {alert.a.span.content}</span></DropdownItem>
            )
          }
          return null;
        })}
      </div>
    )
  }
}


Maintenance.propTypes = {
  allNotifications: PropTypes.array.isRequired,
  notification: PropTypes.object.isRequired,
  getUserNotification: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    allNotifications: state.allNotifications,
    notification: state.notification
  }
}

export default connect(mapStateToProps, {getUserNotification})(Maintenance);