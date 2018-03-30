import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardBlock, CardHeader} from "reactstrap";
import OwlCarousel from 'react-owl-carousel';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchLines, getRealTimeDataOnce} from '../../../actions/actions';

import Machinecard from './../../general/Machinecard/Machinecard';

class ProcessinglineDashboard extends Component {
  constructor(props) {
    super(props);
    // const search = this.props.location.search;
    // const params = new URLSearchParams(search);
    const id = this.props.match.params.pl_id;//params.get('pl_id');
    this.state = {
      ProcessinglineId: id,
      Processingline: {
        pl_id : '',
        pl_name: '',
        pl_number: '',
        machines: {}
      }
    };
  }

  componentDidMount() {
    if(Object.keys(this.props.lines).length > 0){
      this.setState({Processingline: this.props.lines[this.state.ProcessinglineId]});
    } else {
      this.props.fetchLines();
    }
    if(!(Object.keys(this.props.realTimeData).length > 0)){
      this.props.getRealTimeDataOnce();
    }
  }

  componentWillReceiveProps(nextProps){
    if(Object.keys(nextProps.lines).length > 0) {
      // const search = nextProps.location.search;
      // const params = new URLSearchParams(search);
      const id = nextProps.match.params.pl_id;//params.get('pl_id');
      this.setState({ProcessinglineId: id, Processingline: nextProps.lines[id]});
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

    return (
      <div className="animated fadeIn">
        <OwlCarousel className="owl-theme" responsive={responsiveObject} margin={20} loop dots={false} autoplay={true} >
          {Object.keys(this.props.lines).map(function (key) {
            /*if (item.statusLight === "success") {
             return <div key={i} className="item processingline-dashboard-carousel-item success">
             <Link to={"processingline_dashboard?id=" + item.id}>
             <h6>
             {item.name}: {item.id}<br/>
             Status: {item.statusLight}<br/>
             Time: {item.time}
             </h6>
             </Link>
             </div>
             } else if (item.statusLight === "warning") {
             return <div key={i} className="item processingline-dashboard-carousel-item warning">
             <Link to={"processingline_dashboard?id=" + item.id}>
             <h6>
             {item.name}: {item.id}<br/>
             Status: {item.statusLight}<br/>
             Time: {item.time}
             </h6>
             </Link>
             </div>
             } else if (item.statusLight === "danger") {
             return <div key={i} className="item processingline-dashboard-carousel-item danger">
             <Link to={"processingline_dashboard?id=" + item.id}>
             <h6>
             {item.name}: {item.id}<br/>
             Status: {item.statusLight}<br/>
             Time: {item.time}
             </h6>
             </Link>
             </div>
             }*/
            return (<div key={key} className="item processingline-dashboard-carousel-item">
              <Link to={"/dashboard/processingline_dashboard/" + this.props.lines[key].pl_id}>
                <h6>
                  {this.props.lines[key].pl_name}: {this.props.lines[key].pl_number}
                </h6>
              </Link>
            </div>);
          }.bind(this))}
        </OwlCarousel>
        <Card>
          <CardBlock>
            <Row noGutters>
              <Col xs="8" md="8" xl="8">
                <h5> {this.state.Processingline.pl_name} : {this.state.Processingline.pl_number} </h5>
              </Col>
              <Col xs="4" md="4" xl="4">
                <div className="machinecard-title-icons">
                  <i className="fa fa-user"/>&nbsp;&nbsp;<i className="fa fa-video-camera"/>
                </div>
              </Col>
            </Row>
            <Row noGutters>
              <Col xs="1" md="1" xl="2">
              </Col>
              <Col xs="10" md="10" xl="8">
                <Row className="processing-line-text-center">
                  <Col xs="6" md="3" xl="3">
                    <CardHeader className="processingline-dashboard-param">No. of Machines<h5>{Object.keys(this.state.Processingline.machines).length}</h5></CardHeader>
                  </Col>
                  <Col xs="6" md="3" xl="3">
                    <CardHeader className="processingline-dashboard-param">Average Uptime<h5>{this.props.realTimeData[this.state.ProcessinglineId] ? Math.round(this.props.realTimeData[this.state.ProcessinglineId].averageUptime.on * 100)/100 : 0}%</h5></CardHeader>
                  </Col>
                  <Col xs="6" md="3" xl="3">
                    <CardHeader className="processingline-dashboard-param">Issues<h5>0</h5></CardHeader>
                  </Col>
                  <Col xs="6" md="3" xl="3">
                    <CardHeader className="processingline-dashboard-param">Overdue Maint.<h5>3</h5></CardHeader>
                  </Col>
                </Row>
              </Col>
              <Col xs="1" md="1" xl="2">
              </Col>
            </Row>
          </CardBlock>
          <CardBlock className="card-body">
            <Row>
              {Object.keys(this.state.Processingline.machines).map(function (key, i) {
                return (
                  <Machinecard key={key} status={this.state.Processingline.machines[key]}/>
                )
              }.bind(this))}
            </Row>
          </CardBlock>
        </Card>
      </div>
    );
  }
}

ProcessinglineDashboard.propTypes = {
  lines: PropTypes.object.isRequired,
  realTimeData: PropTypes.object.isRequired,
  fetchLines: PropTypes.func.isRequired,
  getRealTimeDataOnce: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  return {
    lines: state.lines,
    realTimeData: state.realTimeData
  }
}

export default connect(mapStateToProps, {fetchLines, getRealTimeDataOnce})(ProcessinglineDashboard);

// <Carousel>
//     {PLCarouselElements.map(function (item, i) {
//         if (i === 0) {
//             return (
//                 <Carousel.Item key={i} active={true}>
//                     {item}
//                     <Carousel.Caption>
//                         <h3>First slide label</h3>
//                         <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//                     </Carousel.Caption>
//                 </Carousel.Item>
//             )
//         } else {
//             return (
//                 <Carousel.Item key={i}>
//                     {item}
//                     <Carousel.Caption>
//                         <h3>Second slide label</h3>
//                         <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//                     </Carousel.Caption>
//                 </Carousel.Item>
//             )
//         }
//     })}
// </Carousel>