import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardSubtitle, CardText} from "reactstrap";
import BarChartPL from '../charts/d3components/c3charts/machinecardBarchart';
import MachinecardParameter from '../Parameter/MachinecardParameter'

class Machinecard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProcessinglineId: this.props.status.general.mc_id.slice(0, 5)
        };
    }

    render() {
        return (
            <Col xs="12" md="6" xl="4">
                <Card>
                    {(function () {
                        if (this.props.status.real_time_data.status === "on") {
                            return (
                                <CardHeader className="machinecard-title-success">
                                    <CardSubtitle className="machinecard-title">
                                        <Link to={"/dashboard/processingline_dashboard/" + this.state.ProcessinglineId+"/machine_dashboard/" + this.props.status.general.mc_id}>{this.props.status.general.mc_name}: {this.props.status.general.mc_number}</Link>&nbsp;
                                        <i className="fa fa-info-circle"/>
                                        <div className="machinecard-title-icons">
                                            <i className="fa fa-user"/>&nbsp;&nbsp;<i className="fa fa-video-camera"/>
                                        </div>
                                    </CardSubtitle>
                                </CardHeader>
                            )
                        } else if (this.props.status.real_time_data.status === "warning") {
                            return (
                                <CardHeader className="machinecard-title-warning">
                                    <CardSubtitle className="machinecard-title">
                                        <Link to={"/dashboard/processingline_dashboard/" + this.state.ProcessinglineId+"/machine_dashboard/" + this.props.status.general.mc_id}>{this.props.status.general.mc_name}: {this.props.status.general.mc_number}</Link>&nbsp;
                                        <i className="fa fa-info-circle"/>
                                        <div className="machinecard-title-icons">
                                            <i className="fa fa-user"/>&nbsp;&nbsp;<i className="fa fa-video-camera"/>
                                        </div>
                                    </CardSubtitle>
                                </CardHeader>
                            )
                        } else if (this.props.status.real_time_data.status === "off") {
                            return (
                                <CardHeader className="machinecard-title-danger">
                                    <CardSubtitle className="machinecard-title">
                                        <Link to={"/dashboard/processingline_dashboard/" + this.state.ProcessinglineId+"/machine_dashboard/" + this.props.status.general.mc_id}>{this.props.status.general.mc_name}: {this.props.status.general.mc_number}</Link>&nbsp;
                                        <i className="fa fa-info-circle"/>
                                        <div className="machinecard-title-icons">
                                            <i className="fa fa-user"/>&nbsp;&nbsp;<i className="fa fa-video-camera"/>
                                        </div>
                                    </CardSubtitle>
                                </CardHeader>
                            )
                        }
                        return null;
                    }.bind(this)())}
                    <div className="machinecard-cardblock-margin">
                        <Row noGutters>
                            <Col xs="8" md="8" xl="8">
                                <BarChartPL uid={this.props.status.general.mc_id}/>
                                <div className="machinecard-card">
                                    <CardText>&nbsp;Issues: {10}<br/>&nbsp;Last Update Time: {(this.props.realTimeData[this.state.ProcessinglineId] && this.props.realTimeData[this.state.ProcessinglineId][this.props.status.general.mc_id] && this.props.realTimeData[this.state.ProcessinglineId][this.props.status.general.mc_id].current.updated_time) ? new Date(this.props.realTimeData[this.state.ProcessinglineId][this.props.status.general.mc_id].current.updated_time).toString().slice(4,24) : 0}</CardText>
                                </div>
                            </Col>
                            <Col xs="4" md="4" xl="4">
                                <Row noGutters>
                                    {Object.keys(this.props.status.operational_threshold).map(function (item) {
                                        if (this.props.realTimeData[this.state.ProcessinglineId] && this.props.realTimeData[this.state.ProcessinglineId][this.props.status.general.mc_id] && (this.props.realTimeData[this.state.ProcessinglineId][this.props.status.general.mc_id].current[item] != null && this.props.realTimeData[this.state.ProcessinglineId][this.props.status.general.mc_id].current[item] != undefined)) {
                                            return (
                                                <Col xs="6" md="6" xl="6" key={item}>
                                                    <MachinecardParameter status={{ParameterName: item, ParameterValue: this.props.realTimeData[this.state.ProcessinglineId][this.props.status.general.mc_id].current[item]}}/>
                                                </Col>
                                            );
                                        }
                                    }.bind(this))}
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </Col>
        );
    }
}

Machinecard.propTypes = {
    realTimeData: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return {
        realTimeData: state.realTimeData
    }
}

export default connect(mapStateToProps)(Machinecard);
//<CardImg className="machinecard-img" src="http://localhost:3000/img/Milling.jpg" alt="Machine"/>

// import Parameter from './../ParameterComponent/Parameter'
//
// var ParametersData = require('./ParametersData.json');
//
// constructor(props) {
//     super(props);
//     this.state = {
//         ParametersData: ParametersData
//     };
// }
//
// <Row>
//     <Col md="6">
//         <Row>
//             {this.state.ParametersData[this.props.status.id].map(function (item, i) {
//                 return (<Parameter status={item}/>);
//             })}
//         </Row>
//     </Col>
// </Row>