import React, {Component} from "react";
import c3 from 'c3';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
var d3Selection = require("d3-selection");

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: {},
      bar: {
        data: {
          type: 'bar',
          groups: [
            ['on', 'off', 'standby']
          ],
          colors: {
            on: '#4dbd74',//'#7b85f7',
            off: '#f86c6b',
            standby:'#f8cb00'
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
        tooltip: {
          format: {
            value: function (value, ratio, id, index) { return value+"%"; }
          }
        },
        padding: {
          top: -22,
          right: 0,
          bottom: 0,
          left: 0
        },
        onrendered: function () {
          if (!(d3Selection.select(this.config.bindto + '.c3 svg g g.c3-axis.c3-axis-x g.tick text tspan').empty()) && !(d3Selection.select(this.config.bindto + ' g g.c3-chart g.c3-chart-texts g.c3-chart-text.c3-target.c3-target-on g.c3-texts.c3-texts-on text.c3-text.c3-text-0').empty())) {
            var t = 0;
            var data = "";
            var index = 0;
            // var barCount = d3Selection.selectAll(this.config.bindto + " g g.c3-chart g.c3-event-rects.c3-event-rects-single rect.c3-event-rect").nodes().length;
            // var tickNodes = d3Selection.selectAll(this.config.bindto + ' g g.c3-axis.c3-axis-x g.tick text tspan').nodes();
            // var tickCount = tickNodes.length;
            // var loopCount = Math.floor(tickCount / barCount);
            // var changeCount = 0;
            // tickNodes.forEach(function (node) {
            //   data = data + node.__data__.splitted;
            //   index = node.__data__.index;
            //   changeCount++;
            //   if(changeCount === loopCount){
            //     d3Selection.select(this.config.bindto+' g g.c3-chart g.c3-chart-texts g.c3-chart-text.c3-target.c3-target-uptime g.c3-texts.c3-texts-uptime text.c3-text.c3-text-'+index)
            //         .call(function(selection) {
            //           var x = +selection.attr("x");
            //           var y = +selection.attr("y");
            //           if(index==0){
            //             t=y;
            //           }
            //           selection.attr("x", t-80 );
            //           selection.attr("y", x+4 );
            //           selection.style("fill", "black" );
            //           selection.attr("transform", "rotate(-90)" );
            //           selection.text(data);
            //         });
            //     changeCount = 0;
            //     data = "";
            //   }
            // }.bind(this));
            d3Selection.selectAll(this.config.bindto + ' g g.c3-axis.c3-axis-x g.tick text tspan')
              .each(function (d, i) {
                if (index !== d.index) {
                  d3Selection.select(this.config.bindto + ' g g.c3-chart g.c3-chart-texts g.c3-chart-text.c3-target.c3-target-on g.c3-texts.c3-texts-on text.c3-text.c3-text-' + index)
                    .call(function (selection) {
                      var x = +selection.attr("x");
                      var y = +selection.attr("y");
                      if (i === 0) {
                        t = y;
                      }
                      selection.attr("x", t - 70);
                      selection.attr("y", x + 4);
                      selection.style("fill", "black");
                      selection.style("font-size", "0.75rem");
                      selection.attr("transform", "rotate(-90)");
                      selection.text(data);
                    });
                  d3Selection.select(this.config.bindto + ' g g.c3-chart g.c3-chart-texts g.c3-chart-text.c3-target.c3-target-off g.c3-texts.c3-texts-off text.c3-text.c3-text-' + index)
                    .call(function (selection) {
                      selection.text('');
                    });
                  d3Selection.select(this.config.bindto + ' g g.c3-chart g.c3-chart-texts g.c3-chart-text.c3-target.c3-target-standby g.c3-texts.c3-texts-standby text.c3-text.c3-text-' + index)
                    .call(function (selection) {
                      selection.text('');
                    });
                  index = d.index;
                  data = d.splitted;
                } else {
                  data = data + d.splitted;
                }
              }.bind(this));
            d3Selection.select(this.config.bindto + ' g g.c3-chart g.c3-chart-texts g.c3-chart-text.c3-target.c3-target-on g.c3-texts.c3-texts-on text.c3-text.c3-text-' + index)
              .call(function (selection) {
                var x = +selection.attr("x");
                selection.attr("x", t - 70);
                selection.attr("y", x + 4);
                selection.style("fill", "black");
                selection.style("font-size", "0.75rem");
                selection.attr("transform", "rotate(-90)");
                selection.text(data);
              });
            d3Selection.select(this.config.bindto + ' g g.c3-chart g.c3-chart-texts g.c3-chart-text.c3-target.c3-target-off g.c3-texts.c3-texts-off text.c3-text.c3-text-' + index)
              .call(function (selection) {
                selection.text('');
              });
            d3Selection.select(this.config.bindto + ' g g.c3-chart g.c3-chart-texts g.c3-chart-text.c3-target.c3-target-standby g.c3-texts.c3-texts-standby text.c3-text.c3-text-' + index)
              .call(function (selection) {
                selection.text('');
              });
          }
        }
      }
    };
  }

  componentDidMount() {
    var uid = this.props.uid;
    if (this.props.realTimeData && this.props.realTimeData[uid] && this.props.lines && this.props.lines[uid]) {
      var columns = [['on'],['off'],['standby']];
      var categories = [];
      Object.keys(this.props.realTimeData[uid]).map(function (machineId) {
        if (this.props.realTimeData[uid][machineId] && this.props.realTimeData[uid][machineId].average && this.props.realTimeData[uid][machineId].average.status && (this.props.realTimeData[uid][machineId].average.status.on >= 0)) {
          if (this.props.lines[uid].machines[machineId] && this.props.lines[uid].machines[machineId].general && this.props.lines[uid].machines[machineId].general.mc_number) {
            columns[0].push(this.props.realTimeData[uid][machineId].average.status.on);
            columns[1].push(this.props.realTimeData[uid][machineId].average.status.off);
            columns[2].push(this.props.realTimeData[uid][machineId].average.status.standby);
            categories.push(this.props.lines[uid].machines[machineId].general.mc_number);
          }
        }
      }.bind(this));

      var bar = this.state.bar;
      bar['bindto'] = '#barchart' + this.props.uid;
      bar.data['columns'] = columns;
      bar.axis.x['categories'] = categories;
      this.setState({chart: c3.generate(bar)});
    }
  }

  componentWillReceiveProps(nextProps) {
    var uid = this.props.uid;
    if (nextProps.realTimeData && nextProps.realTimeData[uid] && nextProps.lines && nextProps.lines[uid]) {
      var columns = [['on'],['off'],['standby']];
      var categories = [];
      Object.keys(nextProps.realTimeData[uid]).map(function (machineId) {
        if (nextProps.realTimeData[uid][machineId] && nextProps.realTimeData[uid][machineId].average && nextProps.realTimeData[uid][machineId].average.status && (nextProps.realTimeData[uid][machineId].average.status.on >= 0)) {
          if (nextProps.lines[uid].machines[machineId] && nextProps.lines[uid].machines[machineId].general && nextProps.lines[uid].machines[machineId].general.mc_number) {
            columns[0].push(nextProps.realTimeData[uid][machineId].average.status.on);
            columns[1].push(nextProps.realTimeData[uid][machineId].average.status.off);
            columns[2].push(nextProps.realTimeData[uid][machineId].average.status.standby);
            categories.push(nextProps.lines[uid].machines[machineId].general.mc_number);
          }
        }
        return null;
      });

      var bar = this.state.bar;
      bar['bindto'] = '#barchart' + this.props.uid;
      bar.data['columns'] = columns;
      bar.axis.x['categories'] = categories;
      this.setState({chart: c3.generate(bar)});
    }
  }

  render() {
    return <div id={"barchart"+this.props.uid}>Chart</div>;
  }
}


BarChart.propTypes = {
  realTimeData: PropTypes.object.isRequired,
  lines: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    realTimeData: state.realTimeData,
    lines: state.lines
  }
}

export default connect(mapStateToProps)(BarChart);