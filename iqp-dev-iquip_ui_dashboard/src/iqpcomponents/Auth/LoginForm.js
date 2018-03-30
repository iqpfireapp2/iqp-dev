import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { emailChanged, passwordChanged, loginUser } from '../../actions/actions';

class LoginForm extends Component {

  onEmailChange(e) {
    this.props.emailChanged(e.target.value);
  }

  onPasswordChange(e) {
    this.props.passwordChanged(e.target.value);
  }

  onButtonClick(e) {
    const { email, password } = this.props;
    this.props.loginUser( {email, password } );
  }

  render() {
    return (
      <div className="form-horizontal">
        <h2>Login</h2>
      <div className="form-group" >
         <label className="control-label col-sm-2" htmlFor="email">Email address:</label>
         <div className="col-sm-10">
         <input
         width="20"
         type="text"
         id="email"
         placeholder="email"
         onChange={this.onEmailChange.bind(this)}
        value= {this.props.email}/>
        </div>
       </div>
       <div className="form-group">
           <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
           <div className="col-sm-10">
           <input placeholder="password"
           type="password"
           id="pwd"
           onChange={this.onPasswordChange.bind(this)}
           value={this.props.password}/>
           </div>
         </div>
         { this.props.error && <div><label font-color="red">{this.props.error}</label></div> }
         <div className="form-group">
    <div className="col-sm-offset-2 col-sm-10">
        <button className="btn btn-primary" onClick={this.onButtonClick.bind(this)}>
          Sign In
        </button>
        </div></div>
        { this.props.loginSuccess && <Redirect to="/dashboard" from="LoginFrom"/>}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { email, password, error, loading, loginSuccess } = state.Auth;
  return {
    email: email,
    password: password,
    error: error,
    loading: loading,
    loginSuccess: loginSuccess
  };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
