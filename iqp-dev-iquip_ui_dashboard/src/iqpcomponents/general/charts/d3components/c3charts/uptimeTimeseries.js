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
        x: 'x'
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
          tick: {
            format: function (x) { return (x === 2 ? "On" : (x === 0 ? "Off" : "Standby")); },
            values: [0, 1, 2],
            count: 3
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
      this.updated_time = this.props.chartData[0].updated_time;
      this.frequency = this.props.frequency ? this.props.frequency : 60000;
      this.props.chartData.forEach(function (element) {
        var param_value = element.param_value === "on" ? 2 : (element.param_value === "off" ? 0 : 1);
        if(this.updated_time >= element.updated_time){
          this.updated_time = element.updated_time + this.frequency;
          columns[0].push(element.updated_time);
          columns[1].push(param_value);
        }else {
          for (var i = this.updated_time; i < element.updated_time; i=i+this.frequency){
            columns[0].push(i);
            columns[1].push(null);
          }
          this.updated_time = element.updated_time + this.frequency;
          columns[0].push(element.updated_time);
          columns[1].push(param_value);
        }
      }.bind(this));
      this.chartMountFlag = true;
      this.timeseries['bindto'] = '#timeserieschart'+this.props.uid;
      this.timeseries.data['columns'] = columns;
      this.chart = c3.generate(this.timeseries);
    }
  }

  componentWillReceiveProps(nextProps) {
    var columns = [['x'], [this.props.uid]];
    if(nextProps.startFlag) {
      if ((!this.chartMountFlag && nextProps.chartData && nextProps.chartData.length > 0) || (this.props.chartData && nextProps.chartData && this.props.chartData[0].updated_time !== nextProps.chartData[0].updated_time)) {
        this.updated_time = nextProps.chartData[0].updated_time;
        this.frequency = nextProps.frequency ? nextProps.frequency : 60000;
        nextProps.chartData.forEach(function (element) {
          var param_value = element.param_value === "on" ? 2 : (element.param_value === "off" ? 0 : 1);
          if (this.updated_time >= element.updated_time) {
            this.updated_time = element.updated_time + this.frequency;
            columns[0].push(element.updated_time);
            columns[1].push(param_value);
          } else {
            for (var i = this.updated_time; i < element.updated_time; i = i + this.frequency) {
              columns[0].push(i);
              columns[1].push(null);
            }
            this.updated_time = element.updated_time + this.frequency;
            columns[0].push(element.updated_time);
            columns[1].push(param_value);
          }
        }.bind(this));
        this.chartMountFlag = true;
        this.timeseries['bindto'] = '#timeserieschart' + this.props.uid;
        this.timeseries.data['columns'] = columns;
        this.chart = c3.generate(this.timeseries);
      }
      if (nextProps.realTimeSensorData && nextProps.realTimeSensorData.param_name === this.props.uid && nextProps.realTimeSensorData.mc_id === this.props.mc_id) {
        this.updateChartData(nextProps.realTimeSensorData);
        // console.log(nextProps.realTimeSensorData.updated_time, this.props.realTimeSensorData.updated_time);
      }
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
    var param_value = realTimeSensorData.param_value === "on" ? 2 : (realTimeSensorData.param_value === "off" ? 0 : 1);
    if(this.updated_time >= realTimeSensorData.updated_time){
      this.updated_time = realTimeSensorData.updated_time + this.frequency;
      columns[0].push(realTimeSensorData.updated_time);
      columns[1].push(param_value);
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
      columns[1].push(param_value);
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
//     x: 'x',
//     columns: [
//       ['x', 1513447921000, 1513447931000, 1513447941000, 1513447951000, 1513447961000, 1513447971000, 1513447981000, 1513447991000, 1513448001000, 1513448011000],
//       ['data1', 300, 300, 0, 0, 0, 0, 0, 0, 300,300],
//       ['data2', 0, 0, 200, 0, 0, 200, 0, 0, 0, 0],
//       ['data3', 0, 0, 0, 0, 0, 0, 100, 100, 0, 0]
//     ],
//     types: {
//       data1: 'area-step',
//       data2: 'area-step',
//       data3: 'area-step'
//     }
//   },
//   line: {
//     step: {
//       type: 'step-before'
//     }
//   },
//   axis: {
//     x: {
//       type: 'timeseries',
//       tick: {
//         format: function (x) { console.log(x);return x.toString().slice(16,24); },
//         count: 4
//       }
//     }
//   },
//   tooltip: {
//     contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
//       // console.log(d); //manage d
//       return '<div class="c3-tooltip-container"><table class="c3-tooltip"><tbody><tr><th colspan="2">'+d[0].x.toString().slice(16,24)+'</th></tr><tr class="c3-tooltip-name--'+d[0].id+'"><td class="name"><span style="background-color:'+color(d[0].id)+'"></span>Status</td><td class="value">On</td></tr></tbody></table></div>'; // formatted html as you want
//     }
//   }
// });

// var chart = c3.generate({
//   data: {
//     x: 'x',
//     columns: [
//       ['x', 1513447921000, 1513447931000, 1513447941000, 1513447951000, 1513447961000, 1513447971000, 1513447981000, 1513447991000, 1513448001000, 1513448011000],
//       ['data1', 300, 300, 0, 0, 0, 0, 0, 0, 300,300],
//       ['data2', 0, 0, 200, 0, 0, 200, 0, 0, 0, 0],
//       ['data3', 0, 0, 0, 0, 0, 0, 100, 100, 0, 0]
//     ],
//     types: {
//       data1: 'step',
//       data2: 'step',
//       data3: 'step'
//     }
//   },
//   line: {
//     step: {
//       type: 'step-before'
//     }
//   },
//   axis: {
//     x: {
//       type: 'timeseries',
//       tick: {
//         format: function (x) { console.log(x);return x.toString().slice(16,24); },
//         count: 4
//       }
//     },
//     y:{
//       min: 27
//     }
//   },
//   tooltip: {
//     contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
//       // console.log(d); //manage d
//       return '<div class="c3-tooltip-container"><table class="c3-tooltip"><tbody><tr><th colspan="2">'+d[0].x.toString().slice(16,24)+'</th></tr><tr class="c3-tooltip-name--'+d[0].id+'"><td class="name"><span style="background-color:'+color(d[0].id)+'"></span>Status</td><td class="value">On</td></tr></tbody></table></div>'; // formatted html as you want
//     }
//   }
// });