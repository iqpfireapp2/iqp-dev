/**
 * Created by Nitin Gupta.
 */

import React, {Component} from "react";
import {Nav, NavItem, NavLink, TabContent} from "reactstrap";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {fetchLines} from '../../../actions/actions';

import General from './../../general/MachineInfo/General/General'
import Technical from './../../general/MachineInfo/Technical/Technical'
import Maintenance from './../../general/MachineInfo/Maintenance/Maintenance'

var tabList = [
  {
    'name': 'General',
    'content': <General/>
  },
  {
    'name': 'Technical',
    'content': <Technical/>
  },
  {
    'name': 'Maintenance',
    'content': <Maintenance/>
  }
];

class MachineInfo extends Component {
  constructor(props) {
    super(props);
    // const search = this.props.location.search; // could be '?foo=bar'
    // const params = new URLSearchParams(search);
    this.id = this.props.match.params.mc_id;//params.get('id');
    this.state = {
      tabList: tabList,
      activeTab: 0
    }
  }

  componentDidMount() {
    if(!(Object.keys(this.props.lines).length > 0)) {
      this.props.fetchLines();
    }
  }

  changeTab(index) {
    if (this.state.activeTab !== index) {
      this.setState({activeTab: index});
    }
  }

  render() {
    const machineData = this.id && this.props.lines && this.props.lines[this.id.slice(0, 5)] && this.props.lines[this.id.slice(0, 5)].machines[this.id];
    // const machineData = {}
    return (
      <div className="animated fadeIn">
        <h3>Machine : {machineData && machineData.general && machineData.general.mc_number ? machineData.general.mc_number : "NA"}</h3>
        <br/>
        <Nav tabs>
          {this.state.tabList.map(function (tab, index) {
            return (
              <NavItem key={index} >
                <NavLink className={(this.state.activeTab === index) ? 'active' : null} onClick={this.changeTab.bind(this, index)}>{tab.name}</NavLink>
              </NavItem>
            );
          }.bind(this))}
        </Nav>
        <TabContent>
          {React.cloneElement(this.state.tabList[this.state.activeTab].content, {id: this.id, machineData: machineData})}
        </TabContent>
      </div>
    );
  }
}

MachineInfo.propTypes = {
  lines: PropTypes.object.isRequired,
  fetchLines: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    lines: state.lines
  }
}

export default connect(mapStateToProps, {fetchLines})(MachineInfo);