/**
 * Created by Nitin Gupta.
 */

import React, {Component} from "react";
import {TabPane} from "reactstrap";

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
            </TabPane>
        );
    }
}