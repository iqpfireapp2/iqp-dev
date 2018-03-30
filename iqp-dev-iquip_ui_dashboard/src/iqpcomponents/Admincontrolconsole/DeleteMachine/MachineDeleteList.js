import React from 'react';
import PropTypes from 'prop-types';
import MachineDeleteCard from './MachineDeleteCard';
import { 
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
      ListGroup,
        ListGroupItem                 
} from "reactstrap";


export default class ProcessingLineList extends React.Component {
  
constructor(props)
{ 
  super(props);
 {
      modal: false
    };  
    this.toggle = this.toggle.bind(this);

} 



  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() 
{  
  const line= this.props.line;
    const deleteGame= this.props.deleteGame;

  
  
  
  
  const emptyMessage = (
    <p>There are no lines yet in your collection.</p>
  );

  const linesList = (
    <div className="ui four cards">
    <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Line Details
              </CardHeader>
              <CardBlock className="card-body">
            <ListGroup>
        <ListGroupItem>
                             { line.map(lineitem => <MachineDeleteCard lineitem={lineitem} key={lineitem._id}   />) }
           
 </ListGroupItem>
         </ListGroup>
        

         

 </CardBlock>
            </Card>
          </Col>
        </Row>
    
    </div>
  );

  return (
    <div>
      {line.length === 0 ? emptyMessage : linesList}
    </div>
  );
}
}
ProcessingLineList.propTypes = {
  line: PropTypes.array.isRequired
 
}

