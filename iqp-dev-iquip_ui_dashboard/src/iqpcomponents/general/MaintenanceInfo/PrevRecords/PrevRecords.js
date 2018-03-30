/**
 * Created by Nitin Gupta.
 */

import React, {Component} from "react";
import {TabPane} from "reactstrap";

var Records = require('./PrevRecords.json');
var PrevRecordsKeys = require('./PrevRecordsKeys.json');

export default class PrevRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Records: Records,
            PrevRecordsKeys: PrevRecordsKeys,
            recentRecord: {}
        }
    }

    componentWillMount() {
        this.setState({recentRecord: this.state.Records[this.props.id][this.state.Records[this.props.id].length - 1]});
    }
    
    render() {
        return (
            <TabPane className="table-responsive">
                <table className="table machine-info-table">
                    <tbody>
                    <tr>
                        {this.state.PrevRecordsKeys.map(function (item, i) {
                            return (
                                <th key={i}>{item.displayName}</th>
                            )
                        })}
                    </tr>
                    {this.state.Records[this.props.id].map(function (item, i) {
                        return (
                            <tr key={i}>
                                {this.state.PrevRecordsKeys.map(function (keys, i) {
                                    if(keys.displayName === "Serviced Date"){
                                        var date = new Date(item[keys.databaseKey]);
                                        var displayDate = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();
                                        return (
                                            <td key={i}>{displayDate}</td>
                                        )
                                    }else {
                                        return (
                                            <td key={i}>{item[keys.databaseKey]}</td>
                                        )
                                    }
                                })}
                            </tr>
                        )
                    }.bind(this))}
                    </tbody>
                </table>
                <button onClick={this.props.changeTab.bind(this, this.props.indexAddNew, this.state.recentRecord)} className="btn machine-info-maintenance-add-button">Edit Recent Record</button>
            </TabPane>
        );
    }
}