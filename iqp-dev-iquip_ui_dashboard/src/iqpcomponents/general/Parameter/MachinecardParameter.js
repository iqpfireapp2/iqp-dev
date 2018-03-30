/**
 * Created by Nitin Gupta.
 */
import React, {Component} from "react";

var ParametersData = require('./../../config/ParametersData.json');

export default class Parameter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ParametersData: ParametersData
        };
    }

    render() {
        return (
            <div className="text-center">
                <i className={this.state.ParametersData[this.props.status.ParameterName].icon + " fa-lg"} style={{textAlign: 'center'}}/><br/>{this.props.status.ParameterValue}
            </div>
        );
    }
}