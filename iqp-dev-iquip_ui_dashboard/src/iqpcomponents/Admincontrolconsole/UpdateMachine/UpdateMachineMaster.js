import React, {Component} from "react";
import { Redirect } from 'react-router-dom';
import { Badge, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardFooter,
  CardBlock,
  FormGroup,
  FormText,
  Form,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from "reactstrap";

import OperationalThresholdInfoUpdate from './OperationalThresholdInfoUpdate';
import MaintenanceInfoUpdate from './MaintenanceInfoUpdate';
import classnames from "classnames";
import {connect} from 'react-redux';
import GeneralInfoUpdate from './GeneralInfoUpdate';

class UpdateMachineMaster extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onEdit= this.onEdit.bind(this);
    this.state = {
      activeTab: '1',
      shouldHide:true,
      P_line: "",
      M_id:"",
      hide:false,
      show:false,
   redirect: false,

Processing_Line_Name:'', 
Processing_Line_no :'',
Machine_Name :'',
Machine_Number :'',
Machine_Type:'',
Model :'',

Manufacture_Info :'',
Mf_Name :'',
Mf_Phone :'',
Mf_Email :'',
Mf_Address :'',
Seller_Info :'',
Installation_Date:'', 
Purpose_Des :'',
errors:{},
loading: false


    };
  }

  
  onEdit(e){
 
this.setState({hide:true})
this.setState({show:false})
  }

//   addForm = (e) =>{
// e.preventDefault()
//  console.log('clicked')
// const data = this.state.alerts  
//   }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  createSelectItems() {
    let items = [];         
    for (let i = 0; i <= this.props.maxValue; i++) {             
         items.push(<option key={i} value={i}>{i}</option>);   
         //here I will be creating my options dynamically based on
         //what props are currently passed to the parent component
    }
    return items;
}  

//   onDropdownSelected(e) {
//     console.log("THE VAL", e.target.value);
//     //here you will see the current selected value of the select input
// }

handleChange = (e) => {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value,
        errors
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }

  
}

 handleSubmit = (e) => {
    e.preventDefault();

    // validation
    let errors = {};
    if (this.state.Processing_Line_Name === '') errors.Processing_Line_Name = "Can't be empty";
    if (this.state.Processing_Line_no === '') errors.Processing_Line_no = "Can't be empty";
     if (this.state.Machine_Name === '') errors.Machine_Name = "Can't be empty";
     if (this.state.Machine_Number === '') errors.Machine_Number = "Can't be empty";
     if (this.state.Machine_Type === '') errors.Machine_Type = "Can't be empty";
     if (this.state.Model === '') errors.Model = "Can't be empty";
     if (this.state.Manufacture_Info === '') errors.Manufacture_Info = "Can't be empty";
     if (this.state.Mf_Name === '') errors.Mf_Name = "Can't be empty";
     if (this.state.Mf_Phone === '') errors.Mf_Phone = "Can't be empty";
     if (this.state.Mf_Email === '') errors.Mf_Email = "Can't be empty";
     if (this.state.Mf_Address === '') errors.Mf_Address = "Can't be empty";
     if (this.state.Seller_Info === '') errors.Seller_Info = "Can't be empty";
     if (this.state.Installation_Date === '') errors.Installation_Date = "Can't be empty";
     if (this.state.Purpose_Des === '') errors.Purpose_Des = "Can't be empty";
     
     
    this.setState({ errors });  
    const isValid = Object.keys(errors).length === 0
    }


// this.setState({
//   data: data.concat({Proceesing_Line:  })
// })
// }
  render() {
    
    // var data = [
    //   { name: 'Matthew', sex: 'male' },
    //   { name: 'Amanda', sex: 'female' }
    //  ];
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="24" md="12" className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Update General Machine Info
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Update Operational Threshold Info
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}>
                  Update Machine Maintanance Info
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
<GeneralInfoUpdate/>
              </TabPane>
                 <TabPane tabId="2">
  
                 </TabPane>
              <TabPane tabId="3">

                  </TabPane>
            </TabContent>
          </Col>
      
        </Row>
      </div>
    );
  }
}



export default UpdateMachineMaster;
