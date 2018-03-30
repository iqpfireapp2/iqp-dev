import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import { connect } from  'react-redux';
import { saveMachineGenInfo } from '../../../actions/actions';

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
class GeneralTabForm extends Component {

  // PRISTINE // DIRTY // TOUCHED // ERROR

  renderInputField(field){

    const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`

    return(
    
      <div className={className}>
  
    <FormGroup row>
                    <Col md="3">
                 
        <label>{field.myLabel}</label>
</Col>
         <Col  md="3">
        <input 
        type="text"
        {...field.input}
        />
                <div className="error">
          {field.meta.touched ? field.meta.error:''}
        </div>

        </Col>
              
        </FormGroup>
  
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
      this.props.saveMachineGenInfo (values,()=>{
        this.props.history.push('/api/machinegeninfo')
      })
  }

  render() {
    return (
  <div>
                <Card>
              <CardHeader>
                <strong>General Info Form > Add Machine Details</strong> 


                
              </CardHeader>
              <CardBlock className="card-body">
  
      <div className="Form">
         <div className="top">
            <h3></h3>
         </div>
         <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>
           

          <Field
            myLabel="Processing Line Name"
            name="processing_line_name"
            component={this.renderInputField}
        type="text"
          />

           <Field
            myLabel="Processing Line No."
            name="processing_line_no"
            component={this.renderInputField}
        type="text"
          />

 <Field
            myLabel="Machine Number"
            name="machine_number"
            component={this.renderInputField}
        type="text"
          />


 <Field
            myLabel="Machine Name"
            name="machine_name"
            component={this.renderInputField}
        type="text"
          />

 <Field
            myLabel="Machine Type"
            name="machine_type"
            component={this.renderInputField}
        type="text"
          />

 <Field
            myLabel="Model"
            name="model"
            component={this.renderInputField}
        type="text"
          />

 <Field
            myLabel="Serial No"
            name="serial_no"
            component={this.renderInputField}
        type="text"
          />

 <Field
            myLabel="Manufacture Name"
            name="mf_name"
            component={this.renderInputField}
        type="text"
          />

 <Field
            myLabel="Manufacture Primary Phone"
            name="mf_phone_pri"
            component={this.renderInputField}
        type="text"
          />

 <Field
            myLabel="Manufacture Secondary Phone"
            name="mf_phone_sec"
            component={this.renderInputField}
        type="text"
          />


 <Field
            myLabel="Manufacture Email"
            name="mf_email"
            component={this.renderInputField}
        type="text"
          />

 <Field
            myLabel="Manufacture Address"
            name="mf_address"
            component={this.renderInputField}
        type="text"
          />

 <Field
            myLabel="Seller Name"
            name="sl_name"
            component={this.renderInputField}
        type="text"
          />


 <Field
            myLabel="Seller Primary Phone"
            name="sl_phone_pri"
            component={this.renderInputField}
        type="text"
          />


 <Field
            myLabel="Seller Secondary Phone"
            name="sl_phone_sec"
            component={this.renderInputField}
         type="text"
          />
 <Field
            myLabel="Seller Email"
            name="sl_email"
            component={this.renderInputField}
        type="text"
          />
 <Field
            myLabel="Seller Address"
            name="sl_address"
            component={this.renderInputField}
        type="text"
          />
 <Field
            myLabel="Installation Date"
            name="installation_date"
            component={this.renderInputField}
        type="text"
          />

 <Field
            myLabel="Purpose"
            name="purpose"
            component={this.renderInputField}
        type="text"
          />

           <Field
            myLabel="Remarks"
          name="remarks"  
            component={this.renderInputField}
        type="text"
          />

           <Field
            myLabel="Supervisor Id"
          name="sup_id"  
            component={this.renderInputField}
        type="text"
          />

          <button type="submit">Submit</button>

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


  if(!values.processing_line_name){
    errors.processing_line_name = "The Processing Line Name is empty"
  }

 if(!values.processing_line_no){
    errors.processing_line_no = "The Processing Line No is empty"
  }

 if(!values.machine_number){
    errors.machine_number = "The machine_number is empty"
  
}



 if(!values.mchine_name){
    errors.mchine_name = "The Machine Name is empty"
  }
 if(!values.machine_type){
    errors.machine_type = "The Machine_Type is empty"
  }
 if(!values.model){
    errors.model = "The Model is empty"
  }

 if(!values.serial_no){
    errors.serial_no = "The Serial No is empty"
  }

 if(!values.mf_name){
    errors.mf_name = "The Manufacture Name is empty"
  }
 if(!values.mf_phone_pri){
    errors.mf_phone_pri = "The Manufacture Phone Primary is empty"
  }
 if(!values.mf_email){
    errors.mf_email = "The Manufacturer email is empty"
  }
 if(!values.mf_address){
    errors.title = "The title is empty"
  }
 if(!values.sl_name){
    errors.sl_name = "The Seller Name is empty"
  }
 if(!values.sl_phone_pri){
    errors.sl_phone_pri = "The Seller Phone  is empty"
 }
 if(!values.sl_email){
    errors.sl_email = "The Seller Email is empty"
  }
  
  if(!values.sl_address){
    errors.sl_address = "The Seller Address is empty"
  }

if(!values.installation_date){
    errors.installation_date = "The Installtion Date is empty"
  }

  return errors;
}


function mapStateToProps(state){
  console.log(state)

  return {

    success:state.data


  }
}

export default reduxForm({
  validate,
  form:'PostMessage'
})(
  connect(mapStateToProps,{saveMachineGenInfo })(GeneralTabForm)
)




