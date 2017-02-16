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

  componentDidUpdate() {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    if (this.props.loggedIn) {
      this.props.router.push("/");
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.processForm(user);
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
      return <Link to='/signup' className='form-bottom-link'>Sign up now.</Link>;
    } else {
      return <Link to='/login' className='form-bottom-link'>Log in to MeetNow!</Link>;
    }
  }
  render() {
      return (
        <div className='login-form-container'>
          <form onSubmit={this.handleSubmit} className='login-form-box'>
            <div className='login-form'>
              <h3 className="login-header-text">{this.headerText()}</h3>
              <div className='auth-errors'>{this.errorHandling()}</div>
              <div className='login-labels'>
                <label htmlFor='username'>Username  </label>
                <input id='username'
                       type='text'
                       value={this.state.username}
                       onChange={this.update('username')}
                       className='login-input'/>
                <label htmlFor='password'>Password</label>
                  <input id='password'
                         type='password'
                         value={this.state.password}
                         onChange={this.update('password')}
                         className='login-input'/>
              </div>
              <input type='submit' value={this.submitButtonText()} className='auth-form-submit-btn'></input>
            </div>
            <div className='below-form-item'>
              <Link to="/" className='guest-login'>
                <i className="fa fa-user" aria-hidden="true"></i>
                <p>Login with guest account</p>
              </Link>
            </div>
            <div className='form-text'>
              {this.navText()} {this.navLink()}
            </div>
          </form>
        </div>
      );
  }

}

const mapStateToProps = ({ session }) => ({
  loggedIn: Boolean(session.currentUser),
  errors: session.errors
});

const mapDispatchToProps = (dispatch, { location }) => {
  const formType = location.pathname.slice(1);
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
