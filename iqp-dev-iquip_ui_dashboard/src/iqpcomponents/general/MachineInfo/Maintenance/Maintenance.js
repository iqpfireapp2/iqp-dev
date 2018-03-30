/**
 * Created by Nitin Gupta.
 */

import React, {Component} from "react";
import {TabPane, Button} from "reactstrap";
import {Link} from 'react-router-dom';

var MaintenanceData = require('./Maintenance.json');
var MaintenaceKeys = require('./MaintenaceKeys.json');

export default class Maintenance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Maintenance: MaintenanceData,
            MaintenaceKeys: MaintenaceKeys
        }
    }

    render() {
        return (
            <TabPane className="table-responsive">
                <table className="table machine-info-table">
                    <tbody>
                    <tr>
                        {this.state.MaintenaceKeys.map(function (item, i) {
                            return (
                                <th key={i}>{item.displayName}</th>
                            )
                        })}
                    </tr>
                    {this.state.Maintenance[this.props.id].map(function (item, i) {
                        return (
                            <tr key={i}>
                                {this.state.MaintenaceKeys.map(function (keys, i) {
                                    return (
                                        <td key={i}>{item[keys.databaseKey]}</td>
                                    )
                                })}
                                <td>
                                    <Button tag={Link} to={"/maintenance_info?mcid=" + this.props.id + "&mtid=" + item.id} className="machine-info-maintenance-add-button">Add/View</Button>
                                </td>
                            </tr>
                        )
                    }.bind(this))}
                    </tbody>
                </table>
            </TabPane>
        );
    }
}