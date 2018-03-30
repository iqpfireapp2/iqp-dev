import React, {Component} from 'react';
import {Badge, Dropdown, DropdownMenu, DropdownItem, Nav, NavItem, NavLink, NavbarToggler, NavbarBrand, TabContent, DropdownToggle} from 'reactstrap';

import {getUserNotification} from '../../../actions/actions';
import {connect} from "react-redux";
import PropTypes from "prop-types";

import Alert from './listTabs/Alert';
import Maintenance from './listTabs/Maintenance';
import Message from './listTabs/Message';

var alerts = require('./alert/alert.json');
var user_nav_items = require('./user_nav_items/user_nav_items.json');
var href_links = require('./href_links.json');

var tabList = [
  {
    'name': 'Alerts',
    'content': <Alert/>
  },
  {
    'name': 'Maintenance',
    'content': <Maintenance/>
  },
  {
    'name': 'Messages',
    'content': <Message/>
  }
];

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notiDropdownOpen: false,
      userDropdownOpen: false,
      alerts: alerts,
      user_nav_items: user_nav_items,
      href_links: href_links,
      tabList: tabList,
      activeTab: 0
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
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>&#9776;</NavbarToggler>
        <NavbarBrand href={href_links.brand}>iQuip Technologies</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Dropdown isOpen={this.state.notiDropdownOpen} toggle={this.toggle.bind(this, "notiDropdownOpen")}>
              <DropdownToggle className="nav-link dropdown-toggle">
                <i className="icon-bell"/><Badge pill color="danger">6</Badge>
              </DropdownToggle>
              <DropdownMenu right className={this.state.notiDropdownOpen ? 'show' : ''}>
                <div className="header-notify-menu">
                  <Nav tabs>
                    {this.state.tabList.map(function (tab, index) {
                      return (
                        <NavItem key={index} style={{width: "90px"}}>
                          <NavLink className={(this.state.activeTab === index) ? 'active' : null} onClick={this.changeTab.bind(this, index)}>{tab.name}<Badge pill color="danger" style={{left: "72%", right: 0, fontSize: "65%"}}>99+</Badge></NavLink>
                        </NavItem>
                      );
                    }.bind(this))}
                  </Nav>
                  <TabContent>
                    {/*{this.state.alerts.map(function (alert, i) {
                  if (alert.name === "alert") {
                    return (
                      <DropdownItem key={i}>{alert.a.content}<span className={`badge ${alert.a.span.className}`}> {alert.a.span.content}</span></DropdownItem>
                    )
                  }
                  return null;
                })}*/}
                    {React.cloneElement(this.state.tabList[this.state.activeTab].content, {id: this.state.alerts})}
                  </TabContent>
                  <DropdownItem header tag="a" className="text-center" href="#"><strong>View All</strong></DropdownItem>
                </div>
                {/*{this.state.alerts.map(function (alert, i) {
                  if (alert.name === "alert") {
                    return (
                      <DropdownItem key={i}>{alert.a.content}<span className={`badge ${alert.a.span.className}`}> {alert.a.span.content}</span></DropdownItem>
                    )
                  } else if (alert.name === "divider") {
                    return (
                      <DropdownItem key={i} divider/>
                    )
                  } else if (alert.name === "view all") {
                    return (
                      <DropdownItem key={i} header tag="a" className="text-center" href={alert.a.href}><strong>{alert.a.content}</strong></DropdownItem>
                    )
                  }
                  return null;
                })}*/}
              </DropdownMenu>
            </Dropdown>
          </NavItem>
          <NavItem>
            <Dropdown isOpen={this.state.userDropdownOpen} toggle={this.toggle.bind(this, "userDropdownOpen")}>
              <DropdownToggle className="nav-link dropdown-toggle">
                <img src={'img/avatars/6.jpg'} className="img-avatar" alt=" "/>
                <span className="d-md-down-none">admin</span>
              </DropdownToggle>
              <DropdownMenu right className={this.state.userDropdownOpen ? 'show' : ''}>
                {this.state.user_nav_items.map(function (item, i) {
                  if (item.name === "item") {
                    return (
                      <DropdownItem key={i} tag="a" href={item.a.href}><i className={`fa ${item.a.i.className}`}></i> {item.a.content}</DropdownItem>
                    )
                  } else if (item.name === "divider") {
                    return (
                      <DropdownItem key={i} divider/>
                    )
                  } else if (item.name === "heading") {
                    return (
                      <DropdownItem key={i} header tag="div" className="text-center"><strong>{item.content}</strong></DropdownItem>
                    )
                  }
                  return null;
                })}
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </Nav>
      </header>
    )
  }
}


Header.propTypes = {
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

export default connect(mapStateToProps, {getUserNotification})(Header);