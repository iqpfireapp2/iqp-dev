import React from 'react';
import { Card,  CardHeader,
  CardFooter,
  CardBlock,
  Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchLines } from '../../../actions/actions';
import ProcessingLineSelect from './ProcessingLineSelect';
import MachineUpdateList from './MachineUpdateList';
 class GeneralInfoUpdate extends React.Component {

  componentDidMount() {
    this.props.fetchLines();
    
  }

   constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }
  
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  render() {
    return (
          <div>
                <Card>
              <CardHeader>
                <strong>General Info Form > Add Machine Details</strong> 


                
              </CardHeader>

              <CardBlock className="card-body">

 <MachineUpdateList lines={this.props.lines}/>


      <Form>
        <FormGroup row>
          <Col md={4}>
          <Label for="ProcessinglineId" >Processing Line Id</Label>
          </Col>
          <Col md={4}>
<ProcessingLineSelect lines={this.props.lines}/> 
          </Col>
 
        </FormGroup>
        <FormGroup row>
          <Col md={4}>
          </Col>
 
          <Col md={4}>
     
          </Col>
        </FormGroup>
      
        <FormGroup row>
          <Col md={4}>
          <Label for="processing_line_name" >Processing Line Name</Label>
        
          </Col>
          <Col md={4}>
            <Input type="processing_line_name" name="Processing Line Name" id="processing_line_name" placeholder="processing_line_name placeholder" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md={4}>
          <Label for="processing_line_name" >Machine Name</Label>
        
          </Col>
          <Col md={4}>
            <Input type="processing_line_name" name="Processing Line Name" id="processing_line_name" placeholder="processing_line_name placeholder" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md={4}>
          <Label for="processing_line_name" >Machine Type</Label>
        
          </Col>
          <Col md={4}>
            <Input type="processing_line_name" name="Processing Line Name" id="processing_line_name" placeholder="processing_line_name placeholder" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md={4}>
          <Label for="processing_line_name" >Processing Line Name</Label>
        
          </Col>
          <Col md={4}>
            <Input type="processing_line_name" name="Processing Line Name" id="processing_line_name" placeholder="processing_line_name placeholder" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md={4}>
          <Label for="processing_line_name" >Model</Label>
        
          </Col>
          <Col md={4}>
            <Input type="processing_line_name" name="Processing Line Name" id="processing_line_name" placeholder="processing_line_name placeholder" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md={4}>
          <Label for="processing_line_name" >Serial No</Label>
        
          </Col>
          <Col md={4}>
            <Input type="processing_line_name" name="Processing Line Name" id="processing_line_name" placeholder="processing_line_name placeholder" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md={4}>
          <Label for="processing_line_name" >Manufacture Name</Label>
        
          </Col>
          <Col md={4}>
            <Input type="processing_line_name" name="Processing Line Name" id="processing_line_name" placeholder="processing_line_name placeholder" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md={4}>
          <Label for="processing_line_name" >Manufacture Primary Phone</Label>
        
          </Col>
          <Col md={4}>
            <Input type="processing_line_name" name="Processing Line Name" id="processing_line_name" placeholder="processing_line_name placeholder" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md={4}>
          <Label for="processing_line_name" >Manufacture Secondary Phone</Label>
        
          </Col>
          <Col md={4}>
            <Input type="processing_line_name" name="Processing Line Name" id="processing_line_name" placeholder="processing_line_name placeholder" />
          </Col>
        </FormGroup>
        
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
              </CardBlock>

                </Card>

                </div>
             
    );
  }
}


GeneralInfoUpdate.propTypes ={
   lines: React.PropTypes.array.isRequired 
  
}



function mapStateToProps(state) {
return {
    lines: state.lines
}
}

export default connect(mapStateToProps, { fetchLines})(GeneralInfoUpdate);
