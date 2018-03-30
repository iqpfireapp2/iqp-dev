import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card,  CardHeader,
  CardFooter,
  CardBlock,
  Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default function UpdateMaintenanceInfoCard({ machinemaintinfo }) {
  return (
       <Col md={3}>

                 <Card>
              <CardHeader>
                <strong>Update Details</strong> 


                
              </CardHeader>

              <CardBlock className="card-body">
     <div className="content">
      </div>
        <div className="header">{machinemaintinfo.act_name}</div>
      
      <div className="extra content">
        <div className="ui two buttons">
          <Link to={`/maintinfoupdate/${machinemaintinfo._id}`} className="ui basic button green">Edit</Link>
               </div>
          </div>
    
                  </CardBlock>

                </Card>
</Col>
  );
}

UpdateMaintenanceInfoCard.propTypes = {
  machinemaintinfo: PropTypes.object.isRequired
}