import React from 'react';
import ProcessingLineList from './ProcessingLineList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchLines } from '../../../actions/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ProcessingLineDlelete extends React.Component {
  componentDidMount() {
    this.props.fetchLines();
  }
  render() {
    return (
      <div>
        <h1>Machine/Processig Line List</h1>
<ProcessingLineList lines={this.props.lines}   />

      </div>
    );
  }
}
ProcessingLineDlelete.propTypes ={
   lines: PropTypes.array.isRequired
  
}


function mapStateToProps(state) {
  return {  
    lines: state.lines
  }
}

export default connect(mapStateToProps, { fetchLines })(ProcessingLineDlelete);

