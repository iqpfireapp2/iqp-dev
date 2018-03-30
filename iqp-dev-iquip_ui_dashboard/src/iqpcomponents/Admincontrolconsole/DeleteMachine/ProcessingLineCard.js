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
 class ProcessingLineCard extends React.Component {


constructor(props)
{ 
  super(props);
     this.state = {
 
       _id: this.props.line ? this.props._id : null,
      line_name: this.props.line ? this.props.line_name : '',
      line_id: this.props.game ? this.props.line_id : '',      
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
  const line= this.props.line;

 return (
     <Row>
           <Col>{line.line_id}</Col>
          <Col>{line.line_name}</Col>
          <Col> <Button className="btn- btn-danger btn-xs"  size="sm" >Delete Line </Button>
        </Col>
           <Col>            
          <Button className="btn- btn-danger btn-xs"  size="sm" >  <Link to={"deletemachine?id=" + this.props.line._id}>Delete Machines</Link></Button>
        </Col>
</Row>
                    
    
    );
  }
 


 }

 
    
  
  ProcessingLineCard.propTypes = {
    line: PropTypes.object.isRequired,
  
  }

  export default connect() (ProcessingLineCard); 