import React from 'react';
import PropTypes from 'prop-types';
import UpdateOperationalThresholdCard from './UpdateOperationalThresholdCard';
import { Card,  CardHeader,
  CardFooter,
  CardBlock,
  Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default function UpdateOperationalThresholdList({ machineoperthresholds }) {
  const emptyMessage = (
    <p>There are no Operatinal Thre Details yet in your collection.</p>
  );

  const machinemaintinfosList = (
    <div className="ui four cards">
      <Row>
           { machineoperthresholds.map(machineoperthreshold => <UpdateOperationalThresholdCard machineoperthreshold={machineoperthreshold} key={machineoperthreshold._id} />) }
    
    </Row>
    </div>
  );

  return (
    <div>
      {machineoperthresholds.length === 0 ? emptyMessage : machinemaintinfosList}
    </div>
  );
}

UpdateOperationalThresholdList.propTypes = {
  machineoperthresholds: PropTypes.array.isRequired
}
