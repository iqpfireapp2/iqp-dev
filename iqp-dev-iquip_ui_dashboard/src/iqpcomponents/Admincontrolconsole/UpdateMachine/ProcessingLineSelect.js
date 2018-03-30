import React from 'react';
import { Card,  CardHeader,
  CardFooter,
  CardBlock,
  Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import ProcessinLineDropdown from './ProcessinLineDropdown';
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
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Processing Line Id
        </DropdownToggle>
        <DropdownMenu refs="lineSelector" value={this.state.currentLineId} onChange={ (e) => {this.selectLine}}>
     { lines.map(line => <ProcessinLineDropdown  line={line} key={line.mc_id}/>) } 
           </DropdownMenu>
      </Dropdown>    

   
    </div>
  );

  return (
    <div>
      {lines.length === 0 ? emptyMessage : itemsList}
    </div>
  );
}
}

ProcessingLineSelect.propTypes = {
  lines: React.PropTypes.array.isRequired
}

