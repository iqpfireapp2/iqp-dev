import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card,  CardHeader,
  CardFooter,
  CardBlock,
  Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default function UpdateOperationalThresholdCard({ machineoperthreshold }) {
  return (
       <Col md={3}>

                 <Card>
              <CardHeader>
                <strong>Update Details</strong> 


                
              </CardHeader>

              <CardBlock className="card-body">
     <div className="content">
      </div>
        <div className="header">{machineoperthreshold.mc_id}</div>
      
      <div className="extra content">
        <div className="ui two buttons">
          <Link to={`/operatthreupdate/${machineoperthreshold._id}`} className="ui basic button green">Edit</Link>
               </div>
          </div>
    
                  </CardBlock>

                </Card>
</Col>
  );
}

UpdateOperationalThresholdCard.propTypes = {
  machineoperthreshold: PropTypes.object.isRequired
}