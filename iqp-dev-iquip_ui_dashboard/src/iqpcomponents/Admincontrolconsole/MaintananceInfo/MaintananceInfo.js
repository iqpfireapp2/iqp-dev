import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import { connect } from  'react-redux';
import { saveMachineMaintInfo } from '../../../actions/actions';
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
class MaintananceInfo extends Component {

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

 

  onSubmit(values){
    console.log(values);
      this.props.saveMachineMaintInfo (values,()=>{
        this.props.history.push('/api/machinemaintinfo')
      })
  }

  render() {
    return (
  <div>
                <Card>
              <CardHeader>
                <strong>Mentainence Info Form > Add Maintenance Activities</strong> 


                
              </CardHeader>
              <CardBlock className="card-body">
  
      <div className="Form">
         <div className="top">
            <h3></h3>
         </div>
         <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>
           

        
 <Field
            myLabel="Machine Id"
            name="machine_id"
            component={this.renderInputField}
        type="text"
          />


 <Field
            myLabel="Activity Name"
                       name="activity_name"
            component={this.renderInputField}
        type="text"
          />

 <Field
            myLabel="Frequency"
            name="frequency"
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


  if(!values.machine_id){
    errors.machine_id = "This Field Cannot be empty"
  }

 if(!values.activity_name){
    errors.activity_name = "This Field Cannot be empty"
  }

 if(!values.frequency){
    errors.frequency = "This Field Cannot be empty"
  
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
  form:'PostMaintananceInfo'
})(
  connect(mapStateToProps,{saveMachineMaintInfo })(MaintananceInfo)
)




