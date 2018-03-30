import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ButtonGroup, Button, Row, Col, Card, CardHeader, CardBlock, CardImg, Form, FormGroup, Label, InputGroup, InputGroupButton} from "reactstrap";
import OwlCarousel from 'react-owl-carousel';
import TimeSeriesChart from '../../general/charts/d3components/c3charts/timeseries';
import UptimeTimeSeriesChart from '../../general/charts/d3components/c3charts/uptimeTimeseries';
import {fetchLines, getRealTimeDataOnce, getSpecificRealTimeData} from '../../../actions/actions';
var MachineData = require('./../../config/MachineData.json');
var ParametersData = require('./../../config/ParametersData.json');

class MachineDashboard extends Component{

  constructor(props) {
    super(props);
    this.chartMountFlag = false;
    // const search = this.props.location.search; // could be '?foo=bar'
    // const params = new URLSearchParams(search);
    const id = this.props.match.params.mc_id;//params.get('mc_id');
    if(this.props.lines && this.props.lines[id.slice(0, 5)] && this.props.lines[id.slice(0, 5)].machines[id]){
      this.state = {
        ParametersData: ParametersData,
        MachineId: id,
        ProcessinglineId: id.slice(0, 5),
        Machines: this.props.lines[id.slice(0, 5)].machines,
        MachineData: this.props.lines[id.slice(0, 5)].machines[id],
        ChartData: {},
        timeRange: {
          start: new Date(new Date() - 86400000).toIsoString().substring(0, 16),
          end: new Date().toIsoString().substring(0, 16)
        },
        fetchedTimeRange: {
          start: new Date(new Date() - 86400000).toIsoString().substring(0, 16),
          end: new Date().toIsoString().substring(0, 16)
        },
        startFlag: true,
        rSelected: 1
      };
    } else {
      this.state = {
        ParametersData: ParametersData,
        MachineId: "",
        ProcessinglineId: "",
        Machines: {},
        MachineData: MachineData,
        ChartData: {},
        timeRange: {
          start: new Date(new Date() - 86400000).toIsoString().substring(0, 16),
          end: new Date().toIsoString().substring(0, 16)
        },
        fetchedTimeRange: {
          start: new Date(new Date() - 86400000).toIsoString().substring(0, 16),
          end: new Date().toIsoString().substring(0, 16)
        },
        startFlag: true,
        rSelected: 1
      };
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.calculateAvgChartData = this.calculateAvgChartData.bind(this);
  }

  componentDidMount() {
    var id = this.state.MachineId;
    if(!(Object.keys(this.props.lines).length > 0)){
      this.props.fetchLines();
      if(!(Object.keys(this.props.realTimeData).length > 0)){
        this.props.getRealTimeDataOnce();
      }
    }else {
      if(!(Object.keys(this.props.realTimeData).length > 0)){
        this.props.getRealTimeDataOnce();
        if(this.props.lines && this.props.lines[id.slice(0, 5)] && this.props.lines[id.slice(0, 5)].machines[id]){
          this.setState({MachineId: id, ProcessinglineId: id.slice(0, 5), Machines: this.props.lines[id.slice(0, 5)].machines, MachineData: this.props.lines[id.slice(0, 5)].machines[id]});
        }
      }else {
        if(this.props.lines && this.props.lines[id.slice(0, 5)] && this.props.lines[id.slice(0, 5)].machines[id] && this.props.realTimeData && this.props.realTimeData[id.slice(0, 5)] && this.props.realTimeData[id.slice(0, 5)][id]){
          var ChartData = JSON.parse(JSON.stringify(this.props.realTimeData[id.slice(0, 5)][id]));
          ChartData["timeDiff"] = {};
          if(ChartData.status){
            ChartData["status"] = ChartData.status.slice(-100);
            ChartData.timeDiff["status"] = 60000;
          }
          Object.keys(this.props.lines[id.slice(0, 5)].machines[id].operational_threshold).map(function (key) {
            if(ChartData[key]){
              ChartData[key] = ChartData[key].slice(-100);
              ChartData.timeDiff[key] = 60000;
            }
            return null;
          }.bind(this));
          this.setState({MachineId: id, ProcessinglineId: id.slice(0, 5), Machines: this.props.lines[id.slice(0, 5)].machines, MachineData: this.props.lines[id.slice(0, 5)].machines[id], startFlag: true, ChartData: ChartData});
          this.chartMountFlag = true;
        } else if(this.props.lines && this.props.lines[id.slice(0, 5)] && this.props.lines[id.slice(0, 5)].machines[id]){
          this.setState({MachineId: id, ProcessinglineId: id.slice(0, 5), Machines: this.props.lines[id.slice(0, 5)].machines, MachineData: this.props.lines[id.slice(0, 5)].machines[id]});
        }
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(Object.keys(nextProps.lines).length > 0) {
      // const search = nextProps.location.search;
      // const params = new URLSearchParams(search);
      const id = nextProps.match.params.mc_id;//params.get('mc_id');
      var ChartData = {};
      if(!this.chartMountFlag && nextProps.lines && nextProps.lines[id.slice(0, 5)] && nextProps.lines[id.slice(0, 5)].machines[id] && nextProps.realTimeData && nextProps.realTimeData[id.slice(0, 5)] && nextProps.realTimeData[id.slice(0, 5)][id]){
        ChartData = JSON.parse(JSON.stringify(nextProps.realTimeData[id.slice(0, 5)][id]));
        ChartData["timeDiff"] = {};
        if(ChartData.status){
          ChartData["status"] = ChartData.status.slice(-100);
          ChartData.timeDiff["status"] = 60000;
        }
        Object.keys(nextProps.lines[id.slice(0, 5)].machines[id].operational_threshold).map(function (key) {
          if(ChartData[key]){
            ChartData[key] = ChartData[key].slice(-100);
            ChartData.timeDiff[key] = 60000;
          }
          return null;
        });
        this.setState({MachineId: id, ProcessinglineId: id.slice(0, 5), Machines: nextProps.lines[id.slice(0, 5)].machines, MachineData: nextProps.lines[id.slice(0, 5)].machines[id], startFlag: true, ChartData: ChartData});
        this.chartMountFlag = true;
      }else if((this.props.specificRealTimeData !== nextProps.specificRealTimeData) && nextProps.lines && nextProps.lines[id.slice(0, 5)] && nextProps.lines[id.slice(0, 5)].machines[id] && nextProps.specificRealTimeData && nextProps.specificRealTimeData[id.slice(0, 5)] && nextProps.specificRealTimeData[id.slice(0, 5)][id]){
        ChartData = this.calculateAvgChartData(nextProps.specificRealTimeData[id.slice(0, 5)][id]);
        this.setState({ChartData: ChartData});
        this.chartMountFlag = true;
      }else if ((id !== this.state.MachineId) && nextProps.lines && nextProps.lines[id.slice(0, 5)] && nextProps.lines[id.slice(0, 5)].machines[id]){
        this.setState({MachineId: id, ProcessinglineId: id.slice(0, 5), Machines: nextProps.lines[id.slice(0, 5)].machines, MachineData: nextProps.lines[id.slice(0, 5)].machines[id]});
      }
    }
  }

  handleChange(event) {
    var newRecord = this.state.timeRange;
    newRecord[event.target.name] = event.target.value;
    this.setState({timeRange: newRecord});
  }

  handleSubmit(event) {
    event.preventDefault();
    var id = this.state.MachineId;
    var ChartData = {};
    if(this.state.fetchedTimeRange.start !== this.state.timeRange.start || this.state.fetchedTimeRange.end !== this.state.timeRange.end){
      var start = new Date(this.state.timeRange.start);
      var end = new Date(this.state.timeRange.end);
      this.props.getSpecificRealTimeData(start, end);
      this.setState({rSelected: 0, startFlag: false, fetchedTimeRange: {start: this.state.timeRange.start, end: this.state.timeRange.end}});
    }else if(this.props.specificRealTimeData && this.props.specificRealTimeData[id.slice(0, 5)] && this.props.specificRealTimeData[id.slice(0, 5)][id]){
      ChartData = this.calculateAvgChartData(this.props.specificRealTimeData[id.slice(0, 5)][id]);
      this.setState({rSelected: 0, startFlag: false, ChartData: ChartData});
      this.chartMountFlag = true;
    }
  }

  calculateAvgChartData(realTimeData){
    var id = this.state.MachineId;
    var ChartData = JSON.parse(JSON.stringify(realTimeData));
    var avgChartData = JSON.parse(JSON.stringify(ChartData));
    avgChartData["timeDiff"] = {};
    // avgChartData["status"] = null;
    // if(ChartData.status){
    // }
    Object.keys(this.props.lines[id.slice(0, 5)].machines[id].operational_threshold).map(function (key) {
      avgChartData[key] = null;
      if(ChartData[key]){
        avgChartData[key] = [];
        var chartDataLength = ChartData[key].length;
        var timeDiff = (ChartData[key][chartDataLength - 1].updated_time - ChartData[key][0].updated_time)/100;
        timeDiff = timeDiff > 60000 ? timeDiff : 60000;
        avgChartData.timeDiff[key] = timeDiff;
        for (var i = ChartData[key][0].updated_time, j = 0; i <= ChartData[key][chartDataLength - 1].updated_time; i = i + timeDiff){
          var avgTime = 0;
          var avgValue = 0;
          var count = 0;
          for (; ChartData[key][j] && ChartData[key][j].updated_time <= i+timeDiff; j++ ){
            avgTime = avgTime + ChartData[key][j].updated_time;
            avgValue = avgValue + ChartData[key][j].param_value;
            count++;
          }
          if(count){
            avgTime = Math.floor(avgTime/count);
            avgValue = avgValue/count;
            avgChartData[key].push({param_value: avgValue, updated_time: avgTime});
          }else {
            avgTime = Math.floor((i + i+timeDiff)/2);
            avgChartData[key].push({param_value: null, updated_time: avgTime});
          }
        }
      }
      return null;
    });
    return avgChartData;
  }

  onRadioBtnClick(rSelected) {
    var id = this.state.MachineId;
    var ChartData = {};

    if(this.state.rSelected !== rSelected && rSelected === 1){
      if(this.props.realTimeData && this.props.realTimeData[id.slice(0, 5)] && this.props.realTimeData[id.slice(0, 5)][id] && this.props.realTimeData[id.slice(0, 5)][id]) {
        ChartData = JSON.parse(JSON.stringify(this.props.realTimeData[id.slice(0, 5)][id]));
        ChartData["timeDiff"] = {};
        if (ChartData.status) {
          ChartData.status = ChartData.status.slice(-100);
          ChartData.timeDiff["status"] = 60000;
        }
        Object.keys(this.props.lines[id.slice(0, 5)].machines[id].operational_threshold).map(function (key) {
          if (ChartData[key]) {
            ChartData[key] = ChartData[key].slice(-100);
            ChartData.timeDiff[key] = 60000;
          }
          return null;
        });
        this.setState({rSelected, startFlag: true, ChartData: ChartData});
      }else {
        this.setState({rSelected, startFlag: true});
      }
    }else if(this.state.rSelected !== rSelected && rSelected === 2){
      if(this.props.realTimeData && this.props.realTimeData[id.slice(0, 5)] && this.props.realTimeData[id.slice(0, 5)][id] && this.props.realTimeData[id.slice(0, 5)][id]) {
        var avgChartData = this.calculateAvgChartData(this.props.realTimeData[id.slice(0, 5)][id]);
        this.setState({rSelected, startFlag: false, ChartData: avgChartData});
      }else {
        this.setState({rSelected, startFlag: false});
      }
    }
  }

  render() {
    var responsiveObject = {
      0: {
        items: 2,
        slideBy:2,
        nav: false
      },
      576: {
        items: 3,
        slideBy:2,
        nav: false
      },
      768: {
        items: 4,
        slideBy:3,
        nav: true
      },
      992: {
        items: 5,
        slideBy:3,
        nav: true
      },
      1400: {
        items: 7,
        slideBy:4,
        nav: false
      }
    };

    const header = function (className) {
      return (
        <Row noGutters>
          <Col xs="12" md="3" xl="3">
            <div className="machine-dashboard-title">
              {this.state.MachineData.general.mc_name}: {this.state.MachineData.general.mc_number}&nbsp;
              <Link to={"/dashboard/processingline_dashboard/"+this.state.ProcessinglineId+"/machine_dashboard/"+ this.state.MachineData.general.mc_id+"/machine_info" } className="fa fa-info-circle"/>&nbsp;&nbsp;
            </div>
          </Col>
          <Col xs="12" md="8" xl="8">
            <Form className={"form-control machine-dashboard-heading-form " + className} style={{border: "none"}} onSubmit={this.handleSubmit} inline>
              <FormGroup>
                <InputGroup>
                  <Label className="pr-1" htmlFor="start">Start Time:</Label>
                  <input type="datetime-local" id="start" placeholder="Date & time" name="start" value={this.state.timeRange && this.state.timeRange.start} onChange={this.handleChange} required/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <Label className="px-1" htmlFor="end">End Time:</Label>
                  <input type="datetime-local" id="end" placeholder="Date & time" name="end" value={this.state.timeRange && this.state.timeRange.end} onChange={this.handleChange} required/>
                  <Button color="primary" className="machine-dashboard-heading-form-btn">Show</Button>
                </InputGroup>
              </FormGroup>
            </Form>
          </Col>
          <Col xs="12" md="1" xl="1">
            <div className="machine-dashboard-title-icons">
              <i className="fa fa-user fa-lg"/>&nbsp;&nbsp;<i className="fa fa-video-camera fa-lg"/>
            </div>
          </Col>
        </Row>
      )
    }.bind(this);

    return (
      <div className="animated fadeIn">
        <OwlCarousel className="owl-theme" responsive={responsiveObject} margin={20} loop dots={false} autoplay={true} >
          {Object.keys(this.state.Machines).map(function (key) {
            if( this.state.MachineData.general.mc_id === this.state.Machines[key].general.mc_id){
              return <div key={key} className="item machine-dashboard-carousel-item selected">
                <Link to={"/dashboard/processingline_dashboard/" + this.state.ProcessinglineId+"/machine_dashboard/" + this.state.Machines[key].general.mc_id}>
                  <h6>
                    {this.state.Machines[key].general.mc_name}: {this.state.Machines[key].general.mc_number}
                  </h6>
                </Link>
              </div>
            } else if (this.state.Machines[key].real_time_data.status === "on") {
              return <div key={key} className="item machine-dashboard-carousel-item success">
                <Link to={"/dashboard/processingline_dashboard/" + this.state.ProcessinglineId+"/machine_dashboard/" + this.state.Machines[key].general.mc_id}>
                  <h6>
                    {this.state.Machines[key].general.mc_name}: {this.state.Machines[key].general.mc_number}
                  </h6>
                </Link>
              </div>
            } else if (this.state.Machines[key].real_time_data.status === "warning") {
              return <div key={key} className="item machine-dashboard-carousel-item warning">
                <Link to={"/dashboard/processingline_dashboard/" + this.state.ProcessinglineId+"/machine_dashboard/" + this.state.Machines[key].general.mc_id}>
                  <h6>
                    {this.state.Machines[key].general.mc_name}: {this.state.Machines[key].general.mc_number}
                  </h6>
                </Link>
              </div>
            } else if (this.state.Machines[key].real_time_data.status === "off") {
              return <div key={key} className="item machine-dashboard-carousel-item danger">
                <Link to={"/dashboard/processingline_dashboard/" + this.state.ProcessinglineId+"/machine_dashboard/" + this.state.Machines[key].general.mc_id}>
                  <h6>
                    {this.state.Machines[key].general.mc_name}: {this.state.Machines[key].general.mc_number}
                  </h6>
                </Link>
              </div>
            }
            return <div key={key} className="item machine-dashboard-carousel-item">
              <Link to={"/dashboard/processingline_dashboard/" + this.state.ProcessinglineId+"/machine_dashboard/" + this.state.Machines[key].general.mc_id}>
                <h6>
                  {this.state.Machines[key].general.mc_name}: {this.state.Machines[key].general.mc_number}
                </h6>
              </Link>
            </div>;
          }.bind(this))}
        </OwlCarousel>
        <Card>
          {(function () {
            if (this.state.MachineData.real_time_data.status === "on") {
              return <CardHeader className="machine-dashboard-heading success">{header("machine-dashboard-heading success")}</CardHeader>
            } else if (this.state.MachineData.real_time_data.status === "warning") {
              return <CardHeader className="machine-dashboard-heading warning">{header("machine-dashboard-heading warning")}</CardHeader>
            } else if (this.state.MachineData.real_time_data.status === "off") {
              return <CardHeader className="machine-dashboard-heading danger">{header("machine-dashboard-heading danger")}</CardHeader>
            }
            return null;
          }.bind(this)())}
          {/*<Button tag={Link} to={"machine_info/" + this.state.Machinecard.id} className="machine-dashboard-info-button">Machine Info</Button>*/}
          <CardHeader>
            <ButtonGroup>
              <Button outline color="primary" style={{marginBottom: -6}} onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>Live</Button>
              <Button outline color="primary" style={{marginBottom: -6}} onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>24hr Avg</Button>
            </ButtonGroup>
            <Button tag="a" color="secondary" className="machine-dashboard-title-icons" style={{marginBottom: -6}} href={"/dashboard/processingline_dashboard/"+this.state.ProcessinglineId+"/machine_dashboard/"+ this.state.MachineData.general.mc_id+"/machine_info"} >Machine Info</Button>
          </CardHeader>
          <CardBlock className="card-body">
            <Row>
              <Col xs="12" md="12" lg="9">
                <Row noGutters>
                  {(function () {
                    if (this.state.ChartData["status"]){
                      return (
                        <Col xs="12" md="6" lg="6" style={{paddingTop: '0.5rem'}}>
                          <h6 className="machine-chart-heading"><i className={"fa fa-line-chart fa-lg"}/> Daily Progress : {this.props.realTimeData && this.props.realTimeData[this.state.ProcessinglineId] && this.props.realTimeData[this.state.ProcessinglineId][this.state.MachineId] && this.props.realTimeData[this.state.ProcessinglineId][this.state.MachineId].current && this.props.realTimeData[this.state.ProcessinglineId][this.state.MachineId].current["status"] ? this.props.realTimeData[this.state.ProcessinglineId][this.state.MachineId].current["status"] : "NA"}</h6>
                          <UptimeTimeSeriesChart uid= "status" mc_id={this.state.MachineId} pl_id={this.state.ProcessinglineId} startFlag={this.state.startFlag} chartData={this.state.ChartData["status"]} frequency={this.state.ChartData.timeDiff["status"]}/>
                        </Col>
                      );
                    }
                  }.bind(this))()}
                  {Object.keys(this.state.ParametersData).map(function (key) {
                    if (this.props.realTimeData[this.state.ProcessinglineId] && this.props.realTimeData[this.state.ProcessinglineId][this.state.MachineId] && (this.props.realTimeData[this.state.ProcessinglineId][this.state.MachineId].current[key] != null && this.props.realTimeData[this.state.ProcessinglineId][this.state.MachineId].current[key] != undefined) && this.state.ChartData[key]) {
                      return (
                        <Col xs="12" md="6" lg="6" style={{paddingTop: '0.5rem'}} key={key}>
                          <h6 className="machine-chart-heading"><i className={this.state.ParametersData[key].icon + " fa-lg"}/> {this.state.ParametersData[key].name} : {this.props.realTimeData[this.state.ProcessinglineId][this.state.MachineId].current[key]}</h6>
                          <TimeSeriesChart uid={key} mc_id={this.state.MachineId}   pl_id={this.state.ProcessinglineId} startFlag={this.state.startFlag} chartData={this.state.ChartData[key]} frequency={this.state.ChartData.timeDiff[key]}/>
                        </Col>
                      );
                    } else if (this.state.ChartData[key]) {
                      return (
                        <Col xs="12" md="6" lg="6" style={{paddingTop: '0.5rem'}} key={key}>
                          <h6 className="machine-chart-heading"><i className={this.state.ParametersData[key].icon + " fa-lg"}/> {this.state.ParametersData[key].name} : NA</h6>
                          <TimeSeriesChart uid={key} mc_id={this.state.MachineId}   pl_id={this.state.ProcessinglineId} startFlag={this.state.startFlag} chartData={this.state.ChartData[key]} frequency={this.state.ChartData.timeDiff[key]}/>
                        </Col>
                      );
                    }
                  }.bind(this))
                    /*<Col xs="12" md="6" lg="6" style={{paddingTop: '0.5rem'}}>
                     <h6 className="machine-chart-heading"><i className="fa fa-thermometer-half fa-lg"/> Temperature : {this.state.Machinecard.temperature}</h6>
                     <TimeSeriesChart uid= "2"/>
                     </Col>
                     <Col xs="12" md="6" lg="6" style={{paddingTop: '0.5rem'}}>
                     <h6 className="machine-chart-heading"><i className="fa fa-microchip fa-lg"/> Vibration : {this.state.Machinecard.vibration}</h6>
                     <TimeSeriesChart uid= "3"/>
                     </Col>
                     <Col xs="12" md="6" lg="6" style={{paddingTop: '0.5rem'}}>
                     <h6 className="machine-chart-heading"><i className="fa fa-volume-up fa-lg"/> Noise : {this.state.Machinecard.noise}</h6>
                     <TimeSeriesChart uid= "4"/>
                     </Col>*/}
                </Row>
                {/*<h6>
                 Status : {this.state.Machinecard.status}<br/><br/>
                 Issue : {this.state.Machinecard.issues}<br/><br/>
                 Time : {this.state.Machinecard.time}<br/><br/>
                 Temperature : {this.state.Machinecard.temperature}&#176;c<br/><br/>
                 Oil Level : {this.state.Machinecard.oilLevel}<br/><br/>
                 Vibration : {this.state.Machinecard.vibration}<br/><br/>
                 Noise : {this.state.Machinecard.noise}<br/><br/>
                 </h6>*/}
              </Col>
              <Col xs="12" md="12" lg="3">
                <Row>
                  <Col xs="6" md="3" lg="6">
                    <CardImg alt="Chart" src={ 'http://localhost:3000/img/chart(1).png'}/>
                  </Col>
                  <Col xs="6" md="3" lg="6">
                    <CardImg alt="Chart" src={ 'http://localhost:3000/img/chart(1).png'}/>
                  </Col>
                  <Col xs="6" md="3" lg="6">
                    <CardImg alt="Chart" src={ 'http://localhost:3000/img/chart(1).png'}/>
                  </Col>
                  <Col xs="6" md="3" lg="6">
                    <CardImg alt="Chart" src={ 'http://localhost:3000/img/chart(1).png'}/>
                  </Col>
                </Row>
                <div className="machine-dashboard-card">
                  <h6 className="machine-chart-heading">&nbsp;Issues</h6>
                  <ul>
                    <li>
                      No issues present.
                    </li>
                    {/*this.state.Machinecard.issues.map(function (item, i){
                     return (
                     <li key={i}>
                     {item}
                     </li>
                     )
                     })*/}
                  </ul>
                </div>
              </Col>
            </Row>
          </CardBlock>
        </Card>
      </div>
    );
  }
}

MachineDashboard.propTypes = {
  lines: PropTypes.object.isRequired,
  realTimeData: PropTypes.object.isRequired,
  realTimeDataOnce: PropTypes.object.isRequired,
  fetchLines: PropTypes.func.isRequired,
  getRealTimeDataOnce: PropTypes.func.isRequired,
  getSpecificRealTimeData: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  return {
    lines: state.lines,
    realTimeData: state.realTimeData,
    realTimeDataOnce: state.realTimeDataOnce,
    specificRealTimeData: state.specificRealTimeData
  }
}

export default connect(mapStateToProps, {fetchLines, getRealTimeDataOnce, getSpecificRealTimeData})(MachineDashboard);