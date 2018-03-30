import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Badge, Nav, NavItem, Button, ButtonGroup} from 'reactstrap';
import classNames from 'classnames';
import nav from './_nav'

var user_nav_items = require('./../user_nav_items/user_nav_items.json');

export default class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_nav_items: user_nav_items
        };
    }

    handleClick(e) {
        e.preventDefault();
        e.target.parentElement.classList.toggle('open');
    }

    activeRoute(routeName, props) {
        return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    }

    render() {

        const props = this.props;
        const activeRoute = this.activeRoute;
        const handleClick = this.handleClick;

        // badge addon to NavItem
        const badge = (badge) => {
            if (badge) {
                const classes = classNames( badge.class );
                return (<Badge className={ classes } color={ badge.variant }>{ badge.text }</Badge>)
            }
        };

        // simple wrapper for nav-title item
        const wrapper = item => { return (item.wrapper && item.wrapper.element ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)): item.name ) };

        // nav list section title
        const title =  (title, key) => {
            const classes = classNames( "nav-title", title.class);
            return (<li key={key} className={ classes }>{wrapper(title)} </li>);
        };

        // nav list divider
        const divider = (divider, key) => (<li key={key} className="divider"></li>);

        // nav item with nav link
        const navItem = (item, key) => {
            const classes = classNames( "nav-link", item.class);
            return (
                <NavItem key={key}>
                    <NavLink to={item.url} className={ classes } activeClassName="active">
                        <i className={item.icon}></i>{item.name}{badge(item.badge)}
                    </NavLink>
                </NavItem>
            )
        };

        // nav dropdown
        const navDropdown = (item, key) => {
            return (
                <li key={key} className={activeRoute(item.url, props)}>
                    <a className="nav-link nav-dropdown-toggle" onClick={handleClick.bind(this)}><i className={item.icon}></i> {item.name}</a>
                    <ul className="nav-dropdown-items">
                        {navList(item.children)}
                    </ul>
                </li>)
        };

        // nav link
        const navLink = (item, idx) =>
            item.title ? title(item, idx) :
                item.divider ? divider(item, idx) :
                    item.children ? navDropdown(item, idx)
                        : navItem(item, idx) ;

        // nav list
        const navList = (items) => {
            return items.map( (item, index) => navLink(item, index) );
        };

        // sidebar-nav root
        return (
            <div className="sidebar">
                <div className="sidebar-header d-md-none">
                    <img src="img/avatars/8.jpg" className="img-avatar" alt="User Profile"/>
                    <div><strong>JOHN DOE</strong></div>
                    <div className="text-muted"><small>Founder &amp; CEO</small></div>
                    <ButtonGroup  aria-label="Button group with nested dropdown">
                        {this.state.user_nav_items.map(function (item, i) {
                            if (item.name === "item") {
                                return (
                                    <Button key={"item"+i}  className="btn-link">
                                        <NavLink to={item.a.href}>
                                            <i className={`fa ${item.a.i.className}`}></i>
                                        </NavLink>
                                    </Button>
                                )
                            }
                            return null;
                        })}
                    </ButtonGroup>
                </div>
                <nav className="sidebar-nav">
                    <Nav>
                        {navList(nav.items)}
                    </Nav>
                </nav>
            </div>
        )
    }
}