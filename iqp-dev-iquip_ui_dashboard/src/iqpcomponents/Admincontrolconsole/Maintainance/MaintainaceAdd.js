import  React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import MaintenanceForm from './MaintenanceForm';

 class MaintainaceAdd extends React.Component

{
 constructor(props) {
    super(props);
    this.state = {
      modal: false,
      _id: this.props.game ? this.props._id : null,
      title: this.props.game ? this.props.title : '',
      cover: this.props.game ? this.props.cover : '',

       _id: this.props.item ? this.props._id : null,
      activity: this.props.item ? this.props.activity : '',
      resposible_peson: this.props.item ? this.props.resposible_peson : '',
      last_serviced_date: this.props.item ? this.props.last_serviced_date : '',      
      duration: this.props.item ? this.props.last_serviced_date : '',   
     remarks: this.props.item ? this.props.last_serviced_date : '',       
    };


    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,

    });
  }
 
  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle()}   >Add</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
         <MaintenanceForm/>

          </Modal>
      </div>
    );
  }
}


export default  MaintainaceAdd; 