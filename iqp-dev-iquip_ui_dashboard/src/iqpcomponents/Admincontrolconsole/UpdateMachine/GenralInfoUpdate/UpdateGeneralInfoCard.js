import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card,  CardHeader,
  CardFooter,
  CardBlock,
  Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default function UpdateGeneralInfoCard({ machinegeninfo }) {
  return (
       <Col md={3}>

                 <Card>
              <CardHeader>
                <strong>Update Details</strong> 


                
              </CardHeader>

              <CardBlock className="card-body">
     <div className="content">
      </div>
        <div className="header">{machinegeninfo.mc_id}</div>
      
      <div className="extra content">
        <div className="ui two buttons">
          <Link to={`/geninfoupdate/${machinegeninfo.mc_id}`} className="ui basic button green">Edit</Link>
               </div>
          </div>
    
                  </CardBlock>

                </Card>
</Col>
  );
}

UpdateGeneralInfoCard.propTypes = {
  machinegeninfo: PropTypes.object.isRequired
}