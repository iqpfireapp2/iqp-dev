import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row} from "reactstrap";

import {fetchLines, getRealTimeDataOnce} from '../../../actions/actions';

import Processingline from './../../general/Processingline/Processingline';

class FactoryDashboard extends Component {
  componentDidMount() {
    if(!(Object.keys(this.props.lines).length > 0)) {
      this.props.fetchLines();
    }
    if (!(Object.keys(this.props.realTimeData).length > 0)) {
      this.props.getRealTimeDataOnce();
    }
    // var endTime = Date.now();
    // var startTime = 1511870616000; //endTime - 86400000;
    // var data = {
    //     startTime: startTime,
    //     endTime: endTime
    // };
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          {Object.keys(this.props.lines).map(function (key) {
            return (
              <Processingline key={key} status={this.props.lines[key]}/>
            )
          }.bind(this))}
        </Row>
      </div>
    );
  }
}

FactoryDashboard.propTypes = {
  lines: PropTypes.object.isRequired,
  fetchLines: PropTypes.func.isRequired,
  realTimeData: PropTypes.object.isRequired,
  getRealTimeDataOnce: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    lines: state.lines,
    realTimeData: state.realTimeData
  }
}

export default connect(mapStateToProps, {fetchLines, getRealTimeDataOnce})(FactoryDashboard);