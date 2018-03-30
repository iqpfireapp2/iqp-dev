import React from 'react';
import classnames from 'classnames';

class UpdateGeneralInfoForm extends React.Component {
  state = {
    _id: this.props.machinemaintinfo ? this.props.machinemaintinfo._id : null,
    act_id: this.props.machinemaintinfo ? this.props.machinemaintinfo.act_id : '',
    activity_name: this.props.machinemaintinfo ? this.props.machinemaintinfo.activity_name : '',
    frequency: this.props.machinemaintinfo ? this.props.machinemaintinfo.frequency : '',
last_serviced_date:  this.props.machinemaintinfo ? this.props.machinemaintinfo.last_serviced_date : '',
mc_id:  this.props.machinemaintinfo ? this.props.machinemaintinfo.mc_id : '',

    errors: {},
    loading: false
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      _id: nextProps.machinemaintinfo._id,
      activity_name: nextProps.machinemaintinfo.activity_name,
      frequency: nextProps.machinemaintinfo.frequency,
      last_serviced_date: nextProps.machinemaintinfo.last_serviced_date,
      mc_id:nextProps.machinemaintinfo.mc_id,
      act_id: nextProps.machinemaintinfo.act_id
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
    if (this.state.activity_name === '') errors.activity_name = "Can't be empty";
    if (this.state.frequecy === '') errors.frequecy = "Can't be empty";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const { _id, act_id, activity_name, frequecy, last_serviced_date, mc_id   } = this.state;
      this.setState({ loading: true });

      this.props.saveInfo({ _id, act_id, activity_name, frequecy, last_serviced_date, mc_id    })
        .catch((err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false })));
    }
  }
  render() {
    const form = (
      <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
        <h1>Edit and Update Details</h1>

        {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

    
          <div className={classnames('field', { error: !!this.state.errors._id})}>
          <label htmlFor="_id">Maintenance Id</label>
          <input
            name="_id"
            value={this.state._id}
            onChange={this.handleChange}
            id="_id"
          />
          <span>{this.state.errors._id}</span>
        </div>

          <div className={classnames('field', { error: !!this.state.errors.act_id})}>
          <label htmlFor="title">Activity Id</label>
          <input
            name="act_id"
            value={this.state.act_id}
            onChange={this.handleChange}
            id="act_id"
          />
          <span>{this.state.errors.act_id}</span>
        </div>


        <div className={classnames('field', { error: !!this.state.errors.activity_name})}>
          <label htmlFor="activity_name">Activity Name</label>
          <input
            name="activity_name"
            value={this.state.activity_name}
            onChange={this.handleChange}
            id="activity_name"
          />
          <span>{this.state.errors.activity_name}</span>
        </div>



        <div className={classnames('field', { error: !!this.state.errors.frequency})}>
          <label htmlFor="frequecy">Frequency</label>
          <input
            name="frequency"
            value={this.state.frequency}
            onChange={this.handleChange}
            id="frequency"
          />
          <span>{this.state.errors.frequecy}</span>
        </div>


         <div className={classnames('field', { error: !!this.state.errors.last_serviced_date})}>
          <label htmlFor="last_serviced_date">Last Serviced Date</label>
          <input
            name="last_serviced_date"
            value={this.state.last_serviced_date}
            onChange={this.handleChange}
            id="last_serviced_date"
          />
          <span>{this.state.errors.last_serviced_date}</span>
        </div>


        <div className={classnames('field', { error: !!this.state.errors.mc_id})}>
          <label htmlFor="mc_id">Machine Id</label>
          <input
            name="mc_id"
            value={this.state.mc_id}
            onChange={this.handleChange}
            id="mc_id"
          />
          <span>{this.state.errors.mc_id}</span>
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


export default UpdateGeneralInfoForm;
