import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardFooter, CardHeader, CardBlock, CardSubtitle} from "reactstrap";
import BarChartPL from '../charts/d3components/c3charts/barchart';
//import DonutChart from './Charts/DoughnutChart';
//import DonutChart from 'react-donut-chart';
import DonutChart from '../charts/d3components/c3charts/doughtchart';
class Processingline extends Component {
    render() {
        return (
            <Col xs="12" md="6" xl="4">
                <Card>
                    <CardHeader>
                        <CardSubtitle className="processing-line-title">
                            <Link to={"/dashboard/processingline_dashboard/" + this.props.status.pl_id}>{this.props.status.pl_name}: {this.props.status.pl_number}</Link>
                            <div className="float-right">
                                <i className="fa fa-video-camera" aria-hidden="true"/>&nbsp;
                                <i className="fa fa-user processing-line-tooltip" aria-hidden="true"><span className="tooltiptext">Tooltip text</span></i>&nbsp;
                                <i className="fa fa-bell" aria-hidden="true"/>
                            </div>
                        </CardSubtitle>
                    </CardHeader>
                    <CardBlock className="card-body processing-line-nopaddingbottom processing-line-padding-l5r5">
                        <Row noGutters>
                            <Col md="6" className="processing-line-pdiv-center">
                                <p className="processing-line-nomarginbottom processing-line-text-small8 processing-line-text-bold">Running Status<br/><span className="processing-line-text-small7">(Live)</span></p>
                                <DonutChart className="processing-line-cdiv-center" uid={this.props.status.pl_id}/>
                            </Col>
                            <Col md="6" className="processing-line-pdiv-center">
                                <p className="processing-line-nomarginbottom processing-line-text-small8 processing-line-text-bold">Uptime Status<br/><span className="processing-line-text-small7">(Last 24hr)</span></p>
                                <BarChartPL className="processing-line-cdiv-center" uid={this.props.status.pl_id}/>
                            </Col>
                        </Row>
                    </CardBlock>
                    <CardFooter>
                        <Row className="processing-line-text-center">
                            <Col md="4" className="processing-line-text-small7 processing-line-nopadding">Average Uptime<h5>{this.props.realTimeData[this.props.status.pl_id] ? Math.round(this.props.realTimeData[this.props.status.pl_id].averageUptime.on * 100)/100 : 0}%</h5></Col>
                            <Col md="4" className="processing-line-text-small7 processing-line-nopadding processing-line-tooltip">Issues<h5>0</h5><span className="tooltiptext">Tooltip text</span></Col>
                            <Col md="4" className="processing-line-text-small7 processing-line-nopadding processing-line-tooltip">Overdue Maint.<h5>3</h5><span className="tooltiptext">Tooltip text</span></Col>
                        </Row>
                    </CardFooter>
                </Card>
            </Col>
        );
    }
}

Processingline.propTypes = {
    realTimeData: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return {
        realTimeData: state.realTimeData
    }
}

export default connect(mapStateToProps)(Processingline);
//<CardImg className="processing-line-img" src="http://localhost:3000/img/Milling.jpg" alt="Processing Line"/>