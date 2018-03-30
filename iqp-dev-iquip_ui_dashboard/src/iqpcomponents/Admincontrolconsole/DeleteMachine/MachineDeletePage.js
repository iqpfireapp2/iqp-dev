import React from 'react';
import MachineDeleteList from './MachineDeleteList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchLine } from '../../../actions/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ProcessingLineDlelete extends React.Component {
  componentDidMount() {
    id:this.props.id,
    this.props.fetchLine();
  }
  render() {
    return (
      <div>
        <h1>Machine Delete List</h1>
<MachineDeleteList line={this.props.line} id={this.props.id}   />

      </div>
    );
  }
}
ProcessingLineDlelete.propTypes ={
   line: PropTypes.array.isRequired
  
}


function mapStateToProps(state) {
  return {  
    line: state.line
  }
}

export default connect(mapStateToProps, { fetchLine })(ProcessingLineDlelete);

