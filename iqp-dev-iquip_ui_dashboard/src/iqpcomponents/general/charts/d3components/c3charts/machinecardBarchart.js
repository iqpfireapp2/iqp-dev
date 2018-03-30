import React, {Component} from "react";
import c3 from 'c3';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
var d3Selection = require("d3-selection");

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.chart = {};
    this.bar = {
      data: {
        type: 'bar',
        colors: {
          uptime: '#7b85f7'
        },
        labels: true
      },
      axis: {
        x: {
          show: false,
          tick: {
            fit: true,
            centered: true
          },
          type: 'category'
        },
        y: {
          show: false
        }
      },
      size: {
        height: 100
      },
      legend: {
        show: false
      },
      grid: {
        focus:{
          show:false
        }
      },
      onrendered: function () {
        if (!(d3Selection.select(this.config.bindto + '.c3 svg g g.c3-axis.c3-axis-x g.tick text tspan').empty()) && !(d3Selection.select(this.config.bindto + ' g g.c3-chart g.c3-chart-texts g.c3-chart-text.c3-target.c3-target-uptime g.c3-texts.c3-texts-uptime text.c3-text.c3-text-0').empty())) {
          var t = 0;
          var data = "";
          var index = 0;
          d3Selection.selectAll(this.config.bindto + ' g g.c3-axis.c3-axis-x g.tick text tspan')
            .each(function (d, i) {
              if (index !== d.index) {
                d3Selection.select(this.config.bindto + ' g g.c3-chart g.c3-chart-texts g.c3-chart-text.c3-target.c3-target-uptime g.c3-texts.c3-texts-uptime text.c3-text.c3-text-' + index)
                  .call(function (selection) {
                    var x = +selection.attr("x");
                    var y = +selection.attr("y");
                    if (i === 0) {
                      t = y;
                    }
                    selection.attr("x", t - 55);
                    selection.attr("y", x + 4);
                    selection.style("fill", "black");
                    selection.style("font-size", "0.7rem");
                    selection.style("font-weight", "600");
                    selection.attr("transform", "rotate(-90)");
                    selection.text(data);
                  });
                index = d.index;
                data = d.splitted;
              } else {
                data = data + d.splitted;
              }
            }.bind(this));
          d3Selection.select(this.config.bindto + ' g g.c3-chart g.c3-chart-texts g.c3-chart-text.c3-target.c3-target-uptime g.c3-texts.c3-texts-uptime text.c3-text.c3-text-' + index)
            .call(function (selection) {
              var x = +selection.attr("x");
              selection.attr("x", t - 55);
              selection.attr("y", x + 4);
              selection.style("fill", "black");
              selection.style("font-size", "0.7rem");
              selection.style("font-weight", "600");
              selection.attr("transform", "rotate(-90)");
              selection.text(data);
            });
        }
      }
    };
  }

  calculateAverage(paramData) {
    var statusData = {
      on: 0,
      off: 0,
      standby: 0
    };
    paramData.forEach(function (data) {
      if (data.param_value === "on") {
        ++statusData.on;
      } else if (data.param_value === "off") {
        ++statusData.off;
      } else {
        ++statusData.standby;
      }
    });
    statusData.on = (statusData.on / paramData.length) * 100;
    statusData.off = (statusData.off / paramData.length) * 100;
    statusData.standby = (statusData.standby / paramData.length) * 100;
    return statusData;
  }

  componentDidMount() {
    var uid = this.props.uid;
    if (uid.length > 5) {
      uid = uid.slice(0, 5);
    }
    if (this.props.realTimeData && this.props.realTimeData[uid] && this.props.realTimeData[uid][this.props.uid] && this.props.realTimeData[uid][this.props.uid]["status"]) {
      var columns = [['uptime']];
      var categories = [];
      var chartDataLength = this.props.realTimeData[uid][this.props.uid]["status"].length;
      var startTime = this.props.realTimeData[uid][this.props.uid]["status"][0].updated_time;
      var endTime = this.props.realTimeData[uid][this.props.uid]["status"][chartDataLength- 1].updated_time;
      var timeDiff = (endTime - startTime)/5;

      for (var i=startTime, j=0; j<chartDataLength-1 &&  i<=endTime; i=i+timeDiff){
        var tempColumn = [];
        for (; this.props.realTimeData[uid][this.props.uid]["status"][j].updated_time < i+timeDiff; j++){
          tempColumn.push(this.props.realTimeData[uid][this.props.uid]["status"][j]);
        }
        columns[0].push(this.calculateAverage(tempColumn).on);
        var category = (new Date(i).toString().slice(16,21)) + " - " + (new Date(i+timeDiff).toString().slice(16,21)) ;
        categories.push(category);
      }

      this.bar['bindto'] = '#barchart' + this.props.uid;
      this.bar.data['columns'] = columns;
      this.bar.axis.x['categories'] = categories;
      this.chart = c3.generate(this.bar);
    }
  }

  componentWillReceiveProps(nextProps) {
    var uid = this.props.uid;
    if (uid.length > 5) {
      uid = uid.slice(0, 5);
    }
    if (nextProps.realTimeData && nextProps.realTimeData[uid] &&nextProps.realTimeData[uid][this.props.uid] && nextProps.realTimeData[uid][this.props.uid]["status"]) {
      var columns = [['uptime']];
      var categories = [];
      var chartDataLength = nextProps.realTimeData[uid][this.props.uid]["status"].length;
      var startTime = nextProps.realTimeData[uid][this.props.uid]["status"][0].updated_time;
      var endTime = nextProps.realTimeData[uid][this.props.uid]["status"][chartDataLength- 1].updated_time;
      var timeDiff = (endTime - startTime)/5;

      for (var i=startTime, j=0; j<chartDataLength-1 &&  i<=endTime; i=i+timeDiff){
        var tempColumn = [];
        for (; nextProps.realTimeData[uid][this.props.uid]["status"][j].updated_time < i+timeDiff; j++){
          tempColumn.push(nextProps.realTimeData[uid][this.props.uid]["status"][j]);
        }
        columns[0].push(this.calculateAverage(tempColumn).on);
        var category = (new Date(i).toString().slice(16,21)) + " - " + (new Date(i+timeDiff).toString().slice(16,21)) ;
        categories.push(category);
      }

      this.bar['bindto'] = '#barchart' + this.props.uid;
      this.bar.data['columns'] = columns;
      this.bar.axis.x['categories'] = categories;
      this.chart = c3.generate(this.bar);
    }
  }

  render() {
    return <div id={"barchart"+this.props.uid}>Chart</div>;
  }
}


BarChart.propTypes = {
  realTimeData: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    realTimeData: state.realTimeData
  }
}

export default connect(mapStateToProps)(BarChart);