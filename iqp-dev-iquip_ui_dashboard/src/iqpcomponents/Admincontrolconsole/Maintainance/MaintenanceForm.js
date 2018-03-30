import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import { connect } from  'react-redux';
import {  saveItems } from '../../../actions/actions';
import { Col, 
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBlock,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from "reactstrap";
class MaintenanceForm extends Component {

  // PRISTINE // DIRTY // TOUCHED // ERROR

  renderInputField(field){

    const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`

    return(
    
      <div className={className}>
  
    <FormGroup row>
                    <Col md="3">
                 
        <label>{field.myLabel}</label>
</Col>
         <Col xs="12" md="4">
        <input 
        type="text"
        {...field.input}
        />
        </Col>
        </FormGroup>
  
        <div className="error">
          {field.meta.touched ? field.meta.error:''}
        </div>
      </div>
    )
  }


  renderTextareaField(field){

     const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`

    return(
      <div className={className}>
        <label>{field.myLabel}</label>
        <textarea
        {...field.input}
        ></textarea>
        <div className="error">
         {field.meta.touched ? field.meta.error:''}
        </div>
      </div>
    )
  }

  // onSubmit(values){
  //   console.log(values);
  //     this.props.saveGame (values,()=>{
  //       this.props.history.push('/api/games')
  //     })
  // }


  onSubmit(values){
    console.log(values);
      this.props.saveItems(values,()=>{
        this.props.history.push('/api/items')
      })
  }

  render() {
    return (
  <div>
                <Card>
              <CardHeader>
                <strong>Maintenance </strong> Elements
              </CardHeader>
              <CardBlock className="card-body">
  
      <div className="Form">
         <div className="top">
            <h3>Add Details</h3>
         </div>
         <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>
           
          <Field
            myLabel="Activity"
            name="activity"
            component={this.renderInputField}
            type="text"
          />

          <Field
            myLabel="Resp."
            name="resposible_peson"
            component={this.renderInputField}
        type="text"
          />

           <Field
            myLabel="Last Serviced Date"
            name="last_serviced_date"
            component={this.renderInputField}
        type="text"
          />

 <Field
            myLabel="Duration"
            name="duration"
            component={this.renderInputField}
        type="text"
          />

 <Field
            myLabel="Remarks"
            name="remarks"
            component={this.renderTextareaField}
        type="text"
          />

          <button type="submit" onClick={this.toggle}>Submit</button>

         </form>
  
      </div>
         </CardBlock>
                </Card>
  </div>
    );
  }

}

function validate(values){
  const errors = {}

  if(!values.activity){
    errors.activity = "The title is empty"
  }

  

  return errors;
}


function mapStateToProps(state){
  console.log(state)
  return {
    success:state.items
  }
}

export default reduxForm({
  validate,
  form:'PostMessage'
})(
  connect(mapStateToProps,{saveItems})(MaintenanceForm)
)




