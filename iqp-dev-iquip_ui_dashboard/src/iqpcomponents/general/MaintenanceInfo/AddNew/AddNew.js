/**
 * Created by Nitin Gupta.
 */

import React, {Component} from "react";
import {TabPane} from "reactstrap";

var RecordKeys = require('./RecordKeys.json');

var defaultRecord = {};
RecordKeys.map(function (keys) {
    defaultRecord[keys.databaseKey] = '';
    return null;
});

Date.prototype.toIsoString = function() {
    var tzo = -this.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            var norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return this.getFullYear() +
        '-' + pad(this.getMonth() + 1) +
        '-' + pad(this.getDate()) +
        'T' + pad(this.getHours()) +
        ':' + pad(this.getMinutes()) +
        ':' + pad(this.getSeconds()) +
        dif + pad(tzo / 60) +
        ':' + pad(tzo % 60);
};

export default class AddNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultRecord: JSON.parse(JSON.stringify(defaultRecord)),
            RecordKeys: RecordKeys,
            record: JSON.parse(JSON.stringify(defaultRecord))
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        var newRecord = this.state.record;
        newRecord[event.target.name] = event.target.value;
        this.setState({record: newRecord});
    }

    handleSubmit(event) {
        event.preventDefault();
        alert('Resp person is: ' + this.state.record.respPerson);
        this.setState({record: this.state.defaultRecord});
        // this.forceUpdate();
        // window.location.reload();
    }

    componentWillMount(){
        if(this.props.recentRecord !== undefined){
            this.setState({record: this.props.recentRecord});
        }
    }

    render() {
        return (
            <TabPane className="container-fluid">
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor={this.state.RecordKeys[0].databaseKey}>{this.state.RecordKeys[0].displayName}:</label>
                        <div className="col-sm-10  col-md-3">
                            <p className="form-control-static">Change Part 1</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor={this.state.RecordKeys[1].databaseKey}>{this.state.RecordKeys[1].displayName}:</label>
                        <div className="col-sm-10  col-md-3">
                            <input type="text" className="form-control" id={this.state.RecordKeys[1].databaseKey} placeholder="Enter name" name={this.state.RecordKeys[1].databaseKey} value={this.state.record[this.state.RecordKeys[1].databaseKey]} onChange={this.handleChange} required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor={this.state.RecordKeys[2].databaseKey}>{this.state.RecordKeys[2].displayName}:</label>
                        <div className="col-sm-10  col-md-3">
                            <input type="datetime-local" className="form-control" id={this.state.RecordKeys[2].databaseKey} placeholder="Date & time of Service" name={this.state.RecordKeys[2].databaseKey} value={this.state.record[this.state.RecordKeys[2].databaseKey] === '' ? new Date().toIsoString().substring(0, 16) : this.state.record[this.state.RecordKeys[2].databaseKey]} onChange={this.handleChange} required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor={this.state.RecordKeys[3].databaseKey}>{this.state.RecordKeys[3].displayName}:</label>
                        <div className="col-sm-10  col-md-3">
                            <input type="number" className="form-control" id={this.state.RecordKeys[3].databaseKey} placeholder="No. of days" name={this.state.RecordKeys[3].databaseKey} value={this.state.record[this.state.RecordKeys[3].databaseKey] === '' ? '' : this.state.record[this.state.RecordKeys[3].databaseKey].substring(0, 2)} onChange={this.handleChange} required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor={this.state.RecordKeys[4].databaseKey}>{this.state.RecordKeys[4].displayName}:</label>
                        <div className="col-sm-10  col-md-3">
                            <textarea className="form-control" id={this.state.RecordKeys[4].databaseKey} placeholder="Enter remarks" name={this.state.RecordKeys[4].databaseKey} value={this.state.record[this.state.RecordKeys[4].databaseKey]} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default">Submit</button>
                        </div>
                    </div>
                </form>
            </TabPane>
        );
    }
}