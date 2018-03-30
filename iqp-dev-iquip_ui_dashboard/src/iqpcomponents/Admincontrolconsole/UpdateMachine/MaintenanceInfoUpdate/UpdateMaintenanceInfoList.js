import React from 'react';
import PropTypes from 'prop-types';
import UpdateMaintenanceInfoCard from './UpdateMaintenanceInfoCard';
import { Card,  CardHeader,
  CardFooter,
  CardBlock,
  Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default function UpdateMaintenanceInfoList({ machinemaintinfos   }) {
  const emptyMessage = (
    <p>There are no Maintenance Details yet in your collection.</p>
  );

  const machinemaintinfosList = (
    <div className="ui four cards">
      <Row>
           { machinemaintinfos.map(machinemaintinfo => <UpdateMaintenanceInfoCard machinemaintinfo={machinemaintinfo} key={machinemaintinfo._id} />) }
    
    </Row>
    </div>
  );

  return (
    <div>
      {machinemaintinfos.length === 0 ? emptyMessage : machinemaintinfosList}
    </div>
  );
}

UpdateMaintenanceInfoList.propTypes = {
  machinemaintinfos: PropTypes.array.isRequired
}
