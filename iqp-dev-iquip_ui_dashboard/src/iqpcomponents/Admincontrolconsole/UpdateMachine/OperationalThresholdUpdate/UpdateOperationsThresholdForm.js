import React from 'react';
import classnames from 'classnames';

class UpdateOperationsThresholdForm extends React.Component {
  state = {
    _id: this.props.machineoperthreshold ? this.props.machineoperthreshold._id : null,
    mc_id: this.props.machineoperthreshold ? this.props.machineoperthreshold.mc_id : '',
    param_name: this.props.machineoperthreshold ? this.props.machineoperthreshold.param_name : '',
    min: this.props.machineoperthreshold ? this.props.machineoperthreshold.min : '',
max:  this.props.machineoperthreshold ? this.props.machineoperthreshold.max : '',
critical:  this.props.machineoperthreshold ? this.props.machineoperthreshold.critical : '',

    errors: {},
    loading: false
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      _id: nextProps.machineoperthreshold._id,
      param_name: nextProps.machineoperthreshold.param_name,
      min: nextProps.machineoperthreshold.min,
      max: nextProps.machineoperthreshold.max,
      critical:nextProps.machineoperthreshold.critical,
      mc_id: nextProps.machineoperthreshold.mc_id
    });
  }

  handleChange = (e) => {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
          [e.target.name]: e.target.value,
        errors
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // validation
    let errors = {};
    if (this.state.param_name === '') errors.param_name = "Can't be empty";
    if (this.state.min === '') errors.min = "Can't be empty";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const { _id, mc_id , parm_name , scenario_type , min , max , critical    } = this.state;
      this.setState({ loading: true });

      this.props.saveInfo({ _id, mc_id , parm_name , scenario_type , min , max  , critical    })
        .catch((err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false })));
    }
  }
  render() {
    const form = (
      <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
        <h1>Edit and Update Details</h1>

        {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

    
          <div className={classnames('field', { error: !!this.state.errors._id})}>
          <label htmlFor="_id">Machine Id</label>
          <input
            name="_id"
            value={this.state.mc_id}
            onChange={this.handleChange}
            id="mc_id"
          />
          <span>{this.state.errors.mc_id}</span>
        </div>

          <div className={classnames('field', { error: !!this.state.errors.machine_id})}>
          <label htmlFor="title">Parameter Name</label>
          <input
            name="parm_name"
            value={this.state.param_name}
            onChange={this.handleChange}
            id="parm_name"
          />
          <span>{this.state.errors.machine_id}</span>
        </div>


        <div className={classnames('field', { error: !!this.state.errors.min})}>
          <label htmlFor="min">Minimum</label>
          <input
            name="min"
            value={this.state.min}
            onChange={this.handleChange}
            id="min"
          />
          <span>{this.state.errors.min}</span>
        </div>



        <div className={classnames('field', { error: !!this.state.errors.max})}>
          <label htmlFor="max">Maximum</label>
          <input
            name="max"
            value={this.state.max}
            onChange={this.handleChange}
            id="max"
          />
          <span>{this.state.errors.max}</span>
        </div>


         <div className={classnames('field', { error: !!this.state.errors.critical})}>
          <label htmlFor="critical">Critical</label>
          <input
            name="critical"
            value={this.state.critical}
            onChange={this.handleChange}
            id="critical"
          />
          <span>{this.state.errors.critical}</span>
        </div>


  
        <div className="field">
          <button className="ui primary button">Save</button>
        </div>
      </form>
    );
    return (
      <div>
        { form }
      </div>
    );
  }
}


export default UpdateOperationsThresholdForm;
