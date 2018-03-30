  import React from 'react';
  import { Link } from 'react-router-dom';
  import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import {connect} from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem } from 'reactstrap';
 class ProcessinLineDropdown extends React.Component {


constructor(props)
{ 
  super(props);
     this.state = {
 
       mc_id: this.props.mc_id ? this.props.mc_id : null,
      pl_number: this.props.pl_number ? this.props.pl_number : ''
     };  

    
} 


render() 
{  
  const line= this.props.line;
    

 return (
                     <Card>
              <CardHeader>
                <strong>Updadte Machine</strong> 


                
              </CardHeader>
              <CardBlock className="card-body">

          <h5> {line.pl_number} </h5>
         <Button> Update General Info </Button>
         <Button> Update Operational Threshold </Button>
         <Button> Update Maintenance Threshold </Button>
             </CardBlock>
    </Card>

                    
    
    );
  }
 


 }

 
   
  
  
  
  ProcessinLineDropdown.propTypes = {
    line: React.PropTypes.object.isRequired,
  
  }

  export default connect() (ProcessinLineDropdown); 