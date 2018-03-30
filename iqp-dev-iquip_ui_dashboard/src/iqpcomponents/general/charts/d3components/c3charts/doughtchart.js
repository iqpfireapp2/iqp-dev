import React, {Component} from "react";
import c3 from 'c3';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class DonutChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: {},
      donut: {
        data: {
          type: 'pie',
          colors: {
            on: '#4dbd74',
            off: '#f86c6b',
            standby:'#f8cb00'
          }
        },
        tooltip: {
          format: {
            value: function (value, ratio, id) {
              return value;
            }
          }
        },
        size:{
          height:100
        },
        pie: {
          width: 25,
          label: {
            show: true
          }
        },
        legend: {
          show: false
        },
        padding: {
          top: 0,
          right: 0,
          bottom: -3,
          left: 0
        }
      }
    };
  }

  componentDidMount() {
    if (this.props.realTimeData && this.props.realTimeData[this.props.uid]) {
      var columns = [['on'], ['off'], ['standby']];
      var onCount = 0;
      var offCount = 0;
      var standbyCount = 0;
      Object.keys(this.props.realTimeData[this.props.uid]).map(function (machineId) {
        if(this.props.realTimeData[this.props.uid][machineId] && this.props.realTimeData[this.props.uid][machineId].current && this.props.realTimeData[this.props.uid][machineId].current.status){
          if(this.props.realTimeData[this.props.uid][machineId].current.status === "on") onCount++;
          else if(this.props.realTimeData[this.props.uid][machineId].current.status === "off") offCount++;
          else if(this.props.realTimeData[this.props.uid][machineId].current.status === "standby") standbyCount++;
        }
      }.bind(this));
      // columns[0].push((onCount/(onCount + offCount + standbyCount))*100);
      // columns[1].push((offCount/(onCount + offCount + standbyCount))*100);
      // columns[2].push((standbyCount/(onCount + offCount + standbyCount))*100);
      columns[0].push(onCount);
      columns[1].push(offCount);
      columns[2].push(standbyCount);
      var donut = this.state.donut;
      donut['bindto'] = '#donutchart'+this.props.uid;
      donut.data['columns'] = columns;
      this.setState({chart: c3.generate(donut)});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.realTimeData && nextProps.realTimeData[this.props.uid]) {
      var columns = [['on'], ['off'], ['standby']];
      var onCount = 0;
      var offCount = 0;
      var standbyCount = 0;

      Object.keys(nextProps.realTimeData[this.props.uid]).map(function (machineId) {
        if(nextProps.realTimeData[this.props.uid][machineId] && nextProps.realTimeData[this.props.uid][machineId].current && nextProps.realTimeData[this.props.uid][machineId].current.status){
          if(nextProps.realTimeData[this.props.uid][machineId].current.status === "on") onCount++;
          else if(nextProps.realTimeData[this.props.uid][machineId].current.status === "off") offCount++;
          else if(nextProps.realTimeData[this.props.uid][machineId].current.status === "standby") standbyCount++;
        }
      }.bind(this));
      // columns[0].push((onCount/(onCount + offCount + standbyCount))*100);
      // columns[1].push((offCount/(onCount + offCount + standbyCount))*100);
      // columns[2].push((standbyCount/(onCount + offCount + standbyCount))*100);
      columns[0].push(onCount);
      columns[1].push(offCount);
      columns[2].push(standbyCount);

      if (Object.keys(this.state.chart).length > 0){
        this.state.chart.load({
          columns: columns
        });
      }else {
        var donut = this.state.donut;
        donut['bindto'] = '#donutchart'+this.props.uid;
        donut.data['columns'] = columns;
        this.setState({chart: c3.generate(donut)});
      }
    }
  }

  render() {
    return (
     <div id={"donutchart"+this.props.uid}>Chart</div>
    );
  }
}

DonutChart.propTypes = {
  realTimeData: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    realTimeData: state.realTimeData
  }
}

export default connect(mapStateToProps)(DonutChart);