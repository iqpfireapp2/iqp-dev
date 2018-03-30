import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import {FormGroup, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from  'react-redux';
import { saveOperationalThreshold } from '../../../actions/actions';

 class OperationalThreshold  extends Component {
   constructor(props) {
     super(props);
     
    this.state = {
      dropdownOpen: false,
      component: ''
    };
  this.toggle = this.toggle.bind(this);   
this.selectComponent = this.selectComponent.bind(this); // dont forget to bind
const  { handleSubmit } = this.props;
             }

selectComponent(event){ // this will take the name of the button thats beeing clicked and sets name of button to state
event.preventDefault();

this.setState({component: event.target.name});
}

toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

 onSubmit(values){
    console.log(values);
      this.props.saveOperationalThreshold(values,()=>{
        this.props.history.push('/api/machineopthreld')
      })
  }


 

 render () {


   let toRender = null;


   switch(this.state.component)
    {

      case 'component 1':
      toRender = <Component1 saveOperationalThreshold={saveOperationalThreshold} onSubmit={this.props.onSubmit} handleSubmit={this.props.handleSubmit}/>   
      break;

      case 'component 2':
      toRender = <Component2 saveOperationalThreshold={saveOperationalThreshold} onSubmit={this.props.onSubmit} handleSubmit={this.props.handleSubmit}/>
      break;

      case 'component 3':
      toRender = <Component3 saveOperationalThreshold={saveOperationalThreshold} onSubmit={this.props.onSubmit} handleSubmit={this.props.handleSubmit}/>
      break;
      
    }

const MenuComponent = ({onClick}) => { // you dont need a class component for this
return (
<div>
  <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Scenario Type
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className = {this.props.name === "component 1"?"Active":""} onClick = {onClick} name = "component 1">Scenario Type 1</DropdownItem>
          <DropdownItem className = {this.props.name === "component 2"?"Active":""} onClick = {onClick} name = "component 2">Scenario Type 2</DropdownItem>
          <DropdownItem className = {this.props.name === "component 3"?"Active":""} onClick = {onClick} name = "component 3"> Scenario Type 3</DropdownItem>
  </DropdownMenu>
      </Dropdown>
    </div>
  );
        }

 

     return (
<div>
               <div className="row">
    <div className="col-md-12">    
 <h3>  <strong>Enter Operational Threshold for each Parmaters</strong></h3>
    </div>
    </div>
   <div className="row">
    <div className="col-md-2">    
 
   </div>
     <div className="col-md-4">    
                   <MenuComponent onClick = {this.selectComponent}/>
 
</div>
        <div className="col-md-6">
                    {toRender} 
                 </div>
        
 </div>     </div>
     
        );
      }
  }


function mapStateToProps(state){
  console.log(state)

  return {

    success:state.data

 }
}

export default reduxForm({
    form:'PostOperationalthresholds'
})(
  connect(mapStateToProps,{saveOperationalThreshold })(OperationalThreshold)
);



 class Component1  extends Component {


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
  onSubmit(values){
    console.log(values);
      this.props.saveOperationalThreshold(values,()=>{
        this.props.history.push('/api/machineopthreld')
      })
  }


 render () {

const saveOperationalThreshold= this.props.saveOperationalThreshold;
     return (
    <div>
         <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>
              <Field
            myLabel="Machine Id"
            name="machine_id"
            component={this.renderInputField}
        type="text"
          />

         <Field
            myLabel="ACtivity Id"
            name="act_id"
            component={this.renderInputField}
        type="text"
          />

         <Field
            myLabel="Minimum"
            name="minimum"
            component={this.renderInputField}
        type="text"
          />

          <button type="submit">Submit</button>

</form>

</div>
        );
      }
    
}

  

 class Component2  extends Component {
  

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
  onSubmit(values){
    console.log(values);
      this.props.saveOperationalThreshold(values,()=>{
        this.props.history.push('/api/machineopthreld')
      })
  }

 render () {

const saveOperationalThreshold= this.props.saveOperationalThreshold;
     return (
    <div>
         <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))} >
           
            <Field
            myLabel="Machine Id"
            name="machine_id"
            component={this.renderInputField}
        type="text"
          />

         <Field
            myLabel="Parameter Name"
            name="parametername"
            component={this.renderInputField}
        type="text"
          />

         <Field
            myLabel="Minimum"
            name="minimum"
            component={this.renderInputField}
        type="text"
          />
         <Field
            myLabel="Maximum"
            name="maximum"
            component={this.renderInputField}
        type="text"
          />


          <button type="submit">Submit</button>

</form>
</div>  
        );
      }
  }

 class Component3  extends Component {
  
  renderInputField(field){

    const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`

    return(
    
      <div className={className}>
  
    <FormGroup row>
                    <Col md="4">
                 
        <label>{field.myLabel}</label>
</Col>
         <Col  md="4">
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

  onSubmit(values){
    console.log(values);
      this.props.saveOperationalThreshold(values,()=>{
        this.props.history.push('/api/machineopthreld')
      })
  }
 
 render () {
const saveOperationalThreshold= this.props.saveOperationalThreshold;
     return (
    <div>
         <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))} >
           
  <Field
            myLabel="Machine Id"
            name="machine_id"
            component={this.renderInputField}
        type="text"
          />

         <Field
            myLabel="Parameter Name"
            name="parametername"
            component={this.renderInputField}
        type="text"
          />

         <Field
            myLabel="Minimum"
            name="minimum"
            component={this.renderInputField}
        type="text"
          />
         <Field
            myLabel="Maximum"
            name="maximum"
            component={this.renderInputField}
        type="text"
          />
         <Field
            myLabel="Critical"
            name="critical"
            component={this.renderInputField}
        type="text"
          />


          <button type="<su></su>bmit">Submit</button>

</form>
</div>
        );
      }
  }

