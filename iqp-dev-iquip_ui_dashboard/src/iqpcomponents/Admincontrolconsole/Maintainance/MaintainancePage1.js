import React from 'react';
import MaintainanceList from './MaintainanceList1';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchItems, deleteItem } from '../../../actions/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class MaintainancePage extends React.Component {
  componentDidMount() {
    this.props.fetchItems();
  }
  render() {
    return (
      <div>
        <h1>Maintenance Details</h1>
<MaintainanceList items={this.props.items} deleteItem={this.props.deleteItem}/>

      </div>
    );
  }
}
MaintainancePage.propTypes ={
   items: PropTypes.array.isRequired
  
}


function mapStateToProps(state) {
  return {  
    items: state.items
  }
}

export default connect(mapStateToProps, { fetchItems, deleteItem })(MaintainancePage);

