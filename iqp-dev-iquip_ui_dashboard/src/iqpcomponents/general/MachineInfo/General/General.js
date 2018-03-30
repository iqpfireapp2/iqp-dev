/**
 * Created by Nitin Gupta.
 */

import React, {Component} from "react";
import {Container, Row, Col, Card, CardHeader, CardBlock, CardTitle, CardText, CardFooter, TabPane} from "reactstrap";

var GeneralData = require('./General.json');
var GeneralKeys = require('./GeneralKeys.json');

export default class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      General: GeneralData,
      GeneralKeys: GeneralKeys
    }
  }

  componentDidMount(){
    console.log(this.props.machineData);
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.machineData);
  }

  tableItems(item, i) {
    if (item.child !== undefined) {
      for (let j = 0; j < item.child.length; j++) {
        if (this.state.General[this.props.id][item.child[j].databaseKey] !== undefined) {
          return ([
            <tr key={i+5}>
              <th>{item.displayName}</th>
            </tr>,
            item.child.map(function (keyCombination, i) {
              return (
                <tr key={i}>
                  <td></td>
                  {function (keyCombination, i) {
                    if (this.state.General[this.props.id][keyCombination.databaseKey] instanceof Array) {
                      return this.tableItems(keyCombination, i);
                    } else if (this.state.General[this.props.id][keyCombination.databaseKey] !== undefined) {
                      return ([
                        <th key={i+7}>{keyCombination.displayName}</th>,
                        <td key={i+8}>{this.state.General[this.props.id][keyCombination.databaseKey]}</td>
                      ]);
                    }
                  }.bind(this, keyCombination, i)()}
                </tr>
              )
            }.bind(this))
          ]);
        }
      }
    } else if (this.state.General[this.props.id][item.databaseKey] !== undefined) {
      if (this.state.General[this.props.id][item.databaseKey] instanceof Array) {
        return ([this.state.General[this.props.id][item.databaseKey].map(function (value, i) {
          return ([<th key={i+30}>{value.key}</th>, <td key={i+4}>{value.data}</td>]);
        })]);
      } else {
        return (
          <tr key={i}>
            <th>{item.displayName}</th>
            <td>{this.state.General[this.props.id][item.databaseKey]}</td>
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
          <Row>
            <Col xs="6" md="2" xl="2">Machine Name:</Col>
            <Col xs="6" md="4" xl="4">{this.props.machineData && this.props.machineData.general && this.props.machineData.general.mc_name}</Col>
            <Col xs="6" md="2" xl="2">Machine Number:</Col>
            <Col xs="6" md="4" xl="4">{this.props.machineData && this.props.machineData.general && this.props.machineData.general.mc_number}</Col>
            <Col xs="6" md="2" xl="2">Machine Type:</Col>
            <Col xs="6" md="4" xl="4">{this.props.machineData && this.props.machineData.general && this.props.machineData.general.mc_type}</Col>
            <Col xs="6" md="2" xl="2">Serial Number:</Col>
            <Col xs="6" md="4" xl="4">{this.props.machineData && this.props.machineData.general && this.props.machineData.general.mc_serial}</Col>
            <Col xs="6" md="2" xl="2">Model Number:</Col>
            <Col xs="6" md="4" xl="4">{this.props.machineData && this.props.machineData.general && this.props.machineData.general.mc_model}</Col>
            <Col xs="6" md="2" xl="2">Installation Date:</Col>
            <Col xs="6" md="4" xl="4">{this.props.machineData && this.props.machineData.general && this.props.machineData.general.inst_date}</Col>
          </Row>
        </Card>
        <Row>
          <Col xs="12" md="6" xl="6">
            <Card>
              <CardHeader tag="h5">Manufacture Details</CardHeader>
              <CardBlock>
                <CardTitle tag="h6">{this.props.machineData && this.props.machineData.general && this.props.machineData.general.mf_name ? this.props.machineData.general.mf_name : null}</CardTitle>
                {this.props.machineData && this.props.machineData.general && (this.props.machineData.general.mf_phone_pri || this.props.machineData.general.mf_phone_sec) ?
                  <table>
                    <tbody>
                    <tr>
                      {this.props.machineData && this.props.machineData.general && this.props.machineData.general.mf_phone_pri ?
                        [<td key="mf_phone_pri1"><i className="fa fa-lg fa-phone-square"/>&nbsp;&nbsp;</td>,
                          <td key="mf_phone_pri2"><CardText className="machine-info-cardText-noMargin">{this.props.machineData.general.mf_phone_pri}&nbsp;&nbsp;&nbsp;&nbsp;</CardText></td>
                        ] : null}
                      {this.props.machineData && this.props.machineData.general && this.props.machineData.general.mf_phone_sec ?
                        [<td key="mf_phone_sec1"><i className="fa fa-lg fa-phone-square"/>&nbsp;&nbsp;</td>,
                          <td key="mf_phone_sec2"><CardText className="machine-info-cardText-noMargin">{this.props.machineData.general.mf_phone_sec}</CardText></td>
                        ] : null}
                    </tr>
                    </tbody>
                  </table>
                  : null}
                <table>
                  <tbody>
                  {this.props.machineData && this.props.machineData.general && this.props.machineData.general.mf_email ?
                    <tr>
                      <td key="mf_email1"><i className="fa fa-lg fa-envelope-square"/>&nbsp;&nbsp;</td>
                      <td key="mf_email2"><CardText className="machine-info-cardText-noMargin">{this.props.machineData.general.mf_email}</CardText></td>
                    </tr>
                    : null}
                  {this.props.machineData && this.props.machineData.general && this.props.machineData.general.mf_address ?
                    <tr>
                      <td key="mf_address1"><i className="fa fa-lg fa-address-book"/>&nbsp;&nbsp;</td>
                      <td key="mf_address2"><CardText className="machine-info-cardText-noMargin">{this.props.machineData.general.mf_address}</CardText></td>
                    </tr>
                    : null}
                  </tbody>
                </table>
              </CardBlock>
              <CardFooter className="text-muted">
                <CardText>Website: NA</CardText>
              </CardFooter>
            </Card>
          </Col>
          <Col xs="12" md="6" xl="6">
            <Card>
              <CardHeader tag="h5">Seller Details</CardHeader>
              <CardBlock>
                <CardTitle tag="h6">{this.props.machineData && this.props.machineData.general && this.props.machineData.general.sl_name ? this.props.machineData.general.sl_name : null}</CardTitle>
                {this.props.machineData && this.props.machineData.general && (this.props.machineData.general.mf_phone_pri || this.props.machineData.general.mf_phone_sec) ?
                  <table>
                    <tbody>
                    <tr>
                      {this.props.machineData && this.props.machineData.general && this.props.machineData.general.sl_phone_pri ?
                        [<td key="mf_phone_pri1"><i className="fa fa-lg fa-phone-square"/>&nbsp;&nbsp;</td>,
                          <td key="mf_phone_pri2"><CardText className="machine-info-cardText-noMargin">{this.props.machineData.general.sl_phone_pri}&nbsp;&nbsp;&nbsp;&nbsp;</CardText></td>
                        ] : null}
                      {this.props.machineData && this.props.machineData.general && this.props.machineData.general.sl_phone_sec ?
                        [<td key="mf_phone_sec1"><i className="fa fa-lg fa-phone-square"/>&nbsp;&nbsp;</td>,
                          <td key="mf_phone_sec2"><CardText className="machine-info-cardText-noMargin">{this.props.machineData.general.sl_phone_sec}</CardText></td>
                        ] : null}
                    </tr>
                    </tbody>
                  </table>
                  : null}
                <table>
                  <tbody>
                  {this.props.machineData && this.props.machineData.general && this.props.machineData.general.sl_email ?
                    <tr>
                      <td key="mf_email1"><i className="fa fa-lg fa-envelope-square"/>&nbsp;&nbsp;</td>
                      <td key="mf_email2"><CardText className="machine-info-cardText-noMargin">{this.props.machineData.general.sl_email}</CardText></td>
                    </tr>
                    : null}
                  {this.props.machineData && this.props.machineData.general && this.props.machineData.general.sl_address ?
                    <tr>
                      <td key="mf_address1"><i className="fa fa-lg fa-address-book"/>&nbsp;&nbsp;</td>
                      <td key="mf_address2"><CardText className="machine-info-cardText-noMargin">{this.props.machineData.general.sl_address}</CardText></td>
                    </tr>
                    : null}
                  </tbody>
                </table>
              </CardBlock>
              <CardFooter className="text-muted">
                <CardText>Website: NA</CardText>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Card className="machine-info-pad10">
          <Row>
            <Col xs="6" md="2" xl="2">Purpose:</Col>
            <Col xs="6" md="4" xl="4">{this.props.machineData && this.props.machineData.general && this.props.machineData.general.purpose}</Col>
            <Col xs="6" md="2" xl="2">Remarks:</Col>
            <Col xs="6" md="4" xl="4">{this.props.machineData && this.props.machineData.general && this.props.machineData.general.remark}</Col>
          </Row>
        </Card>
        <br/>
      </div>
    );
  }
}

{/*<TabPane className="table-responsive">*/}
    {/*<table className="table machine-info-table">*/}
        {/*{this.state.GeneralKeys.map(function (item, i) {*/}
            {/*return (*/}
                {/*<tbody key={i}>*/}
                {/*{this.tableItems.bind(this, item, i)()}*/}
                {/*</tbody>*/}
            {/*)*/}
        {/*}.bind(this))}*/}
    {/*</table>*/}
{/*</TabPane>*/}