import React from 'react';
import PropTypes from 'prop-types';
import ProcessingLineCard from './ProcessingLineCard';
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
  const lines= this.props.lines;
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
                             { lines.map(line => <ProcessingLineCard line={line} key={line._id}   />) }
           
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
      {lines.length === 0 ? emptyMessage : linesList}
    </div>
  );
}
}
ProcessingLineList.propTypes = {
  lines: PropTypes.array.isRequired
 
}

