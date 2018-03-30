import React from 'react';
import { Row,Card,  CardHeader,
  CardFooter,
  CardBlock,
  Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import ProcessinLineDropdown from './ProcessinLineDropdown';
import MachineUpdateCard from './MachineUpdateCard';

export default class ProcessingLineSelect extends React.Component {
  

     constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
currentLineId:"P001"
    };
  }
  
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() 
{  
const lines = this.props.lines; 
 
  
  
  
  const emptyMessage = (
    <p>There are no games yet in your collection.</p>
  );

  const itemsList = (
    <div className="ui four cards">


     { lines.map(line => <MachineUpdateCard  line={line} key={line.mc_id}/>) } 

   
    </div>
  );

  return (
    <div>
<Row>
    <Col md={3}>
      {lines.length === 0 ? emptyMessage : itemsList}
    </Col>
    </Row>
    </div>
  );
}
}

ProcessingLineSelect.propTypes = {
  lines: React.PropTypes.array.isRequired
}

