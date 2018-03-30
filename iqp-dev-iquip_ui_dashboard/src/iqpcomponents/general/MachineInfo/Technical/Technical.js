/**
 * Created by Nitin Gupta.
 */

import React, {Component} from "react";
import {Card} from "reactstrap";
// import {scaleLinear as d3} from "d3-scale";
var d3Scale= require("d3-scale");
var d3Selection = require("d3-selection");
var d3Axis = require("d3-axis");
var d3Format = require("d3-format");

var TechnicalData = require('./Technical.json');
var TechnicalKeys = require('./TechnicalKeys.json');

export default class Technical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Technical: TechnicalData,
      TechnicalKeys: TechnicalKeys
    }
  }
  componentDidMount(){
    /* -----------------------------------------------------------------------------
* Polylinear Color Scale
* ======================
* Useful for divergent color scales and showing deviation from some
* meaningful midpoint or average.
* --------------------------------------------------------------------------- */
    var min = 0.00,
      mid = 0.25,
      max = 1.00;

    drawKey(min, mid, max, 500, 20)

    /*
     * min: number, min datum
     * mid: number, midpoint or average
     * max: number, max datum
     * width: number, width of key
     * height: number, height of key
     */
    function drawKey(min, mid, max, width, height) {
      // Scales
      var colorRange = ['#7b3294', '#ffffbf', '#008837'],
        color = d3Scale.scaleLinear()
          .domain([min, mid, max])
          .range(colorRange),
        x = d3Scale.scaleLinear()
          .domain([min, max])
          .range([0, width])

      var x = d3Scale.scaleLinear()
        .domain([min, max])
        .range([0, width])

      var svg = d3Selection.select('#key')

      // SVG defs
      var defs = svg
        .datum({min: min, mid: mid})
        .append('svg:defs')

      // Gradient defs
      var gradient1 = defs.append('svg:linearGradient')
        .attr('id', 'gradient1')
      var gradient2 = defs.append('svg:linearGradient')
        .attr('id', 'gradient2')

      // Gradient 1 stop 1
      gradient1.append('svg:stop')
        .datum({min: min})
        .attr('stop-color', function(d) { return color(d.min) })
        .attr('offset', '0%')

      // Gradient 1 stop 2
      gradient1.append('svg:stop')
        .datum({mid: mid})
        .attr('stop-color', function(d) { return color(d.mid) })
        .attr('offset', '100%')

      // Gradient 2 stop 1
      gradient2.append('svg:stop')
        .datum({mid: mid})
        .attr('stop-color', function(d) { return color(d.mid) })
        .attr('offset', '0%')

      // Gradient 2 stop 2
      gradient2.append('svg:stop')
        .datum({max: max})
        .attr('stop-color', function(d) { return color(d.max) })
        .attr('offset', '100%')

      // Gradient 1 rect
      svg
        .datum({min: min, mid: mid })
        .append('svg:rect')
        .attr('id', 'gradient1-bar')
        .attr('fill', 'url(#gradient1)')
        .attr('width', function(d) { return x(d.mid) })
        .attr('height', height)

      // Gradient 2 rect
      svg
        .datum({mid: mid, max: max})
        .append('svg:rect')
        .attr('id', 'gradient2-bar')
        .attr('fill', 'url(#gradient2)')
        .attr('transform', function(d) { return 'translate(' + x(d.mid) + ',0)'})
        .attr('width', function(d) { return x(d.max) - x(d.mid) })
        .attr('height', height)

      // Append axis
      var axis = d3Axis.axisBottom()
        .tickFormat(d3Format.format('.0%'))
        .tickValues([min, mid, max])

      svg.append('g').attr('class', 'axis')

      svg.selectAll('.axis')
        .attr('transform', 'translate(0,'+(height)+')')
        .call(axis)
    }
  }

  tableItems(item, i) {
    if (item.child !== undefined) {
      for (let j = 0; j < item.child.length; j++) {
        if (this.state.Technical[this.props.id][item.child[j].databaseKey] !== undefined) {
          return ([
            <tr key={i+5}>
              <th>{item.displayName}</th>
            </tr>,
            item.child.map(function (keyCombination, i) {
              return (
                <tr key={i}>
                  <td></td>
                  {function (keyCombination, i) {
                    if (this.state.Technical[this.props.id][keyCombination.databaseKey] instanceof Array) {
                      return this.tableItems(keyCombination, i);
                    } else if (this.state.Technical[this.props.id][keyCombination.databaseKey] !== undefined) {
                      return ([
                        <th key={i+7}>{keyCombination.displayName}</th>,
                        <td key={i+8}>{this.state.Technical[this.props.id][keyCombination.databaseKey]}</td>
                      ]);
                    }
                  }.bind(this, keyCombination, i)()}
                </tr>
              )
            }.bind(this))
          ]);
        }
      }
    } else if (this.state.Technical[this.props.id][item.databaseKey] !== undefined) {
      if (this.state.Technical[this.props.id][item.databaseKey] instanceof Array) {
        return ([this.state.Technical[this.props.id][item.databaseKey].map(function (value, i) {
          return ([<th key={i+30}>{value.key}</th>, <td key={i+4}>{value.data}</td>]);
        })]);
      } else {
        return (
          <tr key={i}>
            <th>{item.displayName}</th>
            <td>{this.state.Technical[this.props.id][item.databaseKey]}</td>
          </tr>);
      }
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="machine-info-pad10">
        <br/>
        <Card className="machine-info-pad10">
          <svg id="key">
          </svg>
        </Card>
      </div>
    );
  }
}

{/*
<TabPane className="table-responsive">
  <table className="table machine-info-table">
    {this.state.TechnicalKeys.map(function (item, i) {
      return (
        <tbody key={i}>
        {this.tableItems.bind(this, item, i)()}
        </tbody>
      )
    }.bind(this))}
  </table>
</TabPane>*/}