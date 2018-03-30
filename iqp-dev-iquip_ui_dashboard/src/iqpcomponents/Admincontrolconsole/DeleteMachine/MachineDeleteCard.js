  import React from 'react';
  import { Link } from 'react-router-dom';
  import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
  } from "reactstrap";
import {connect} from 'react-redux';
  import PropTypes from 'prop-types';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
 import { fetchLine } from '../../../actions/actions';
 class MachineDeleteCard extends React.Component {


constructor(props)
{ 
  super(props);
     this.state = {
 
       _id: this.props.lineitem ? this.props._id : null,
      machine_id: this.props.lineitem ? this.props.machine_id : '',
      machine_name: this.props.lineitem ? this.props.line_id : '',      
     modal: false
    };  
   
} 

  updateGame() {
    this.setState({
      modal: !this.state.modal
    });
  }

render() 
{  
  const lineitem= this.props.lineitem;

 return (
     <Row>
           <Col>{lineitem.machine_id}</Col>
          <Col>{lineitem.machine_name}</Col>
          <Col> <Button className="btn- btn-danger btn-xs"  size="sm" >Delete Line </Button>
        </Col>
           <Col>              
          <Button className="btn- btn-danger btn-xs"  size="sm" >Delete Machines</Button>
        </Col>
</Row>
                    
    
    );
  }
 


 }

 
    
  
  MachineDeleteCard.propTypes = {
    lineitem: PropTypes.object.isRequired,
  
  }

  export default connect() (MachineDeleteCard); 