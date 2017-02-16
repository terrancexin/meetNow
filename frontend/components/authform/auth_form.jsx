import React from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { login, logout, signup, clearSessionErrors } from './../../actions/session_actions';

class AuthForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.processForm(user).then(() => {
      this.props.closeModal()
    });
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((erorr, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  errorHandling() {
    return this.props.errors.map((error) => (
      <ul>
        <li key={error.id}>{error}</li>
      </ul>
    ));
  }

  submitButtonText() {
    if (this.props.formType === 'login') {
      return 'Log in';
    } else {
      return 'Sign up';
    }
  }

  headerText() {
    if (this.props.formType === 'login') {
      return 'Log in';
    } else {
      return 'Sign up';
    }
  }

  navText() {
    if (this.props.formType === 'login') {
      return 'New member? Sign up';
    } else {
      return 'Already member? Log in';
    }
  }

  navLink() {
    if (this.props.formType === 'login') {
      return <button onClick={this.props.toggleForm}>Sign up Now</button>;
    } else {
      return <button onClick={this.props.toggleForm}>Log in Now</button>;
    }
  }

  renderGuest() {
   if (this.props.formType === "login"){
       return <button type="button" className="guest-login" onClick={this.setGuest()}>Guest</button>
   }
  }

  setGuest() {
    return e => this.setState({
      "username": "AppAcademy",
      "password": "123abc"
    });
  }

  render() {
      return (
        <div className='auth-form-container'>
          <form onSubmit={this.handleSubmit} className='auth-form-box'>
            <div className='auth-form'>
              <h3 className="auth-form-header">{this.headerText()}</h3>
              <div className='auth-form-errors'>{this.errorHandling()}</div>
              <div className='login-labels'>
                <label htmlFor='username'>Username  </label>
                <input id='username'
                       type='text'
                       value={this.state.username}
                       onChange={this.update('username')}
                       className='auth-input'/>
                <label htmlFor='password'>Password</label>
                  <input id='password'
                         type='password'
                         value={this.state.password}
                         onChange={this.update('password')}
                         className='auth-input'/>
              </div>
              <input type='submit' value={this.submitButtonText()} className='auth-form-submit-btn'></input>
              {this.renderGuest()}
            </div>

            <div className='form-text'>
              {this.navText()} {this.navLink()}
            </div>
          </form>
        </div>
      );
  }

}

const mapStateToProps = ({ session }) => {
  return {

    loggedIn: Boolean(session.currentUser),
    errors: session.errors
  }
};

const mapDispatchToProps = (dispatch, { formType }) => {
  const processForm = (formType === 'login') ? login : signup;

  return {
    clearErrors: () => dispatch(receiveSessionErrors({})),
    processForm: user => dispatch(processForm(user)),
    formType
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AuthForm));
