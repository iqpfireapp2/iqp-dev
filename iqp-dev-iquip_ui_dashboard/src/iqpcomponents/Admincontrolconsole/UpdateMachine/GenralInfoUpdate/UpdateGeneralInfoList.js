import React from 'react';
import PropTypes from 'prop-types';
import UpdateGeneralInfoCard from './UpdateGeneralInfoCard';
import { Card,  CardHeader,
  CardFooter,
  CardBlock,
  Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default function UpdateGeneralInfoList({ geninfos   }) {
  const emptyMessage = (
    <p>There are no Maintenance Details yet in your collection.</p>
  );

  const machinegeninfosList = (
    <div className="ui four cards">
      <Row>
           { geninfos.map(machinegeninfo => <UpdateGeneralInfoCard machinegeninfo={machinegeninfo} key={machinegeninfo._id} />) }
    
    </Row>
    </div>
  );

  return (
    <div>
      {geninfos.length === 0 ? emptyMessage : machinegeninfosList}
    </div>
  );
}

UpdateGeneralInfoList.propTypes = {
  geninfos: PropTypes.array.isRequired
}
