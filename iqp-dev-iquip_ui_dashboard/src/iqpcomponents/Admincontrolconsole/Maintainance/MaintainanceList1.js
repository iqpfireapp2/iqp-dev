import React from 'react';
import PropTypes from 'prop-types';
import MaintananceCard from './MaintananceCard1';
import MaintainaceAdd from './MaintainaceAdd';
import { 
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";


export default class MaintainanceList extends React.Component {
  
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
  const items= this.props.items;
    const deleteItem= this.props.deleteItem;

  
  
  
  
  const emptyMessage = (
    <p>There are no games yet in your collection.</p>
  );

  const itemsList = (
    <div className="ui four cards">
    <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Machine Details
              </CardHeader>
              <CardBlock className="card-body">
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Resp. Person</th>
                    <th>Last Serviced Date</th>
                   <th> Duration</th>
                   <th>Remarks</th>
                   <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                  </thead>
                  <tbody>
           { items.map(item => <MaintananceCard item={item} key={item._id} deleteItem={deleteItem}  />) }
                  </tbody>
                </Table>
   
 

 </CardBlock>
            </Card>
          </Col>
        </Row>
    
    </div>
  );

  return (
    <div>
      {items.length === 0 ? emptyMessage : itemsList}
    </div>
  );
}
}
MaintainanceList.propTypes = {
  items: PropTypes.array.isRequired,
 deleteItem: PropTypes.func.isRequired
}
