import React, {Component} from "react";
import c3 from 'c3';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class TimeSeriesChart extends Component {
  constructor(props) {
    super(props);
    this.chartMountFlag = false;
    this.redrawArgs = [];
    this.chart = null;
    this.flowFlag = false;
    this.updated_time = 0;
    this.frequency = this.props.frequency ? this.props.frequency : 60000;
    this.timeseries = {
      data: {
        x: 'x',
        types:{}
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: function (x) { return x.toString().slice(16,24); },
            count: 4
          },
          padding: {
            left: 0,
            right: 0
          }
        },
        y: {
          // min: 0,
          // max: 23,
          tick: {
            format: function (x) { return Math.round(x); },
            count: 5
          },
          padding: {
            top: 30,
            bottom: 30
          }
        }
      },
      tooltip: {
        format: {
          title: function (x) { return x.toString().slice(0,24); }
        }
      },
      point: {
        r: 1
      },
      area: {
        zerobased: false
      },
      legend: {
        show: false
      },
      padding: {
        top: 0,
        bottom: 0,
        left: 50,
        right: 20
      }
    };
  }

  componentDidMount() {
    if (this.props.chartData && this.props.chartData.length > 0) {
      var columns = [['x'], [this.props.uid]];
      if (this.props.startFlag) {
        this.updated_time = this.props.chartData[0].updated_time;
        this.frequency = this.props.frequency ? this.props.frequency : 60000;
        this.props.chartData.forEach(function (element) {
          if (this.updated_time >= element.updated_time) {
            this.updated_time = element.updated_time + this.frequency;
            columns[0].push(element.updated_time);
            columns[1].push(element.param_value);
          } else {
            for (var i = this.updated_time; i < element.updated_time; i = i + this.frequency) {
              columns[0].push(i);
              columns[1].push(null);
            }
            this.updated_time = element.updated_time + this.frequency;
            columns[0].push(element.updated_time);
            columns[1].push(element.param_value);
          }
        }.bind(this));
        this.chartMountFlag = true;
        this.timeseries['bindto'] = '#timeserieschart' + this.props.uid;
        this.timeseries.data['columns'] = columns;
        this.timeseries.data.types[this.props.uid] = 'area';
        this.chart = c3.generate(this.timeseries);
      } else {
        this.props.chartData.forEach(function (element) {
          columns[0].push(element.updated_time);
          columns[1].push(element.param_value);
        });
        this.chartMountFlag = true;
        this.timeseries['bindto'] = '#timeserieschart'+this.props.uid;
        this.timeseries.data['columns'] = columns;
        this.timeseries.data.types[this.props.uid] = 'area';
        this.chart = c3.generate(this.timeseries);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    var columns = [['x'], [this.props.uid]];
    if(nextProps.startFlag){
      if ((!this.chartMountFlag && nextProps.chartData && nextProps.chartData.length > 0)|| (this.props.chartData && nextProps.chartData && this.props.chartData[0].updated_time !== nextProps.chartData[0].updated_time)) {
        this.updated_time = nextProps.chartData[0].updated_time;
        this.frequency = nextProps.frequency ? nextProps.frequency : 60000;
        nextProps.chartData.forEach(function (element) {
          if(this.updated_time >= element.updated_time){
            this.updated_time = element.updated_time + this.frequency;
            columns[0].push(element.updated_time);
            columns[1].push(element.param_value);
          }else {
            for (var i = this.updated_time; i < element.updated_time; i=i+this.frequency){
              columns[0].push(i);
              columns[1].push(null);
            }
            this.updated_time = element.updated_time + this.frequency;
            columns[0].push(element.updated_time);
            columns[1].push(element.param_value);
          }
        }.bind(this));
        this.chartMountFlag = true;
        this.timeseries['bindto'] = '#timeserieschart'+this.props.uid;
        this.timeseries.data['columns'] = columns;
        this.timeseries.data.types[this.props.uid] = 'area';
        this.chart = c3.generate(this.timeseries);
      }
      if (nextProps.realTimeSensorData && nextProps.realTimeSensorData.param_name === this.props.uid && nextProps.realTimeSensorData.mc_id === this.props.mc_id) {
        this.updateChartData(nextProps.realTimeSensorData);
        // console.log(nextProps.realTimeSensorData.updated_time , this.props.realTimeSensorData.updated_time);
      }
    }else if (this.props.chartData && nextProps.chartData && this.props.chartData[0].updated_time !== nextProps.chartData[0].updated_time) {
      nextProps.chartData.forEach(function (element) {
        columns[0].push(element.updated_time);
        columns[1].push(element.param_value);
      });
      this.chartMountFlag = true;
      this.timeseries['bindto'] = '#timeserieschart'+this.props.uid;
      this.timeseries.data['columns'] = columns;
      this.timeseries.data.types[this.props.uid] = 'area';
      this.chart = c3.generate(this.timeseries);
    }
  }

  appendChartData(){
    // console.log("Hello");
    if (this.redrawArgs.length > 0){
      this.chart.flow(this.redrawArgs.shift());
    } else {
      this.flowFlag = false;
    }
  }

  updateChartData(realTimeSensorData){
    var columns = [['x'], [this.props.uid]];
    var redrawArgs = {};
    if(this.updated_time >= realTimeSensorData.updated_time){
      this.updated_time = realTimeSensorData.updated_time + this.frequency;
      columns[0].push(realTimeSensorData.updated_time);
      columns[1].push(realTimeSensorData.param_value);
      redrawArgs['columns'] = columns;
      redrawArgs['length'] = 1;
      redrawArgs['duration'] = 0;
      redrawArgs['done'] = this.appendChartData.bind(this);
      this.redrawArgs.push(redrawArgs);
      if (this.chart && !this.flowFlag && this.redrawArgs.length > 0 ){
        this.chart.flow(this.redrawArgs.shift());
        this.flowFlag = true;
      }
    } else {
      var length = 1;
      for (var i = this.updated_time; i < realTimeSensorData.updated_time; i=i+this.frequency){
        columns[0].push(i);
        columns[1].push(null);
        length++;
      }
      this.updated_time = realTimeSensorData.updated_time + this.frequency;
      columns[0].push(realTimeSensorData.updated_time);
      columns[1].push(realTimeSensorData.param_value);
      redrawArgs['columns'] = columns;
      redrawArgs['length'] = length;
      redrawArgs['duration'] = 0;
      redrawArgs['done'] = this.appendChartData.bind(this);
      this.redrawArgs.push(redrawArgs);
      if (this.chart && !this.flowFlag && this.redrawArgs.length > 0 ){
        this.chart.flow(this.redrawArgs.shift());
        this.flowFlag = true;
      }
    }
  }

  render() {
    return (
      <div id={"timeserieschart"+this.props.uid}>Chart</div>
    );
  }
}

TimeSeriesChart.propTypes = {
  realTimeSensorData: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    realTimeSensorData: state.realTimeSensorData
  }
}

export default connect(mapStateToProps)(TimeSeriesChart);


// var chart = c3.generate({
//   data: {
//     columns: [
//       ['data1', 100, 150, 300, 100, 120, 50, 100, 150, 200, 100]
//     ],
//     types: {
//       data1: 'area',
//       data2: 'area-spline'
//     }
//   },
//   axis: {
//     y: {
//       min: 0,
//       max: 250
//     }
//   },
//   area:{
//     zerobased: true
//   }
// });