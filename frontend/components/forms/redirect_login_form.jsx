import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { login, clearSessionErrors } from '../../actions/session_actions';
import Errors from '../errors/errors';

class RedirectLogInForm extends React.Component {
  constructor() {
    super();
    this.state = { email: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.clearSessionErrors();
  }

  handleChange(field) {
    return (event) => this.setState({ [field]: event.currentTarget.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.login(user).then(() => hashHistory.push('/'));
  }

  guestLogin(email, password) {
    return (event) => {
      event.preventDefault();
      this.props.clearSessionErrors();
      this.setState({ email: "", password: "" }, () => {
        this.typeValue(email, "email", () => {
          this.typeValue(password, "password", () => {
            this.props.login(this.state).then(() => hashHistory.push('/'));
          });
        });
      });
    };
  }

  typeValue(value, field, callback) {
    if (!value) return callback();
    this.setState({ [field]: this.state[field] + value[0] });
    setTimeout(() => {
      this.typeValue(value.slice(1), field, callback);
    }, 40);
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className='redirect-login-container animated tada'>
        <div className='form-header'>
          <h1>Log in</h1>
          <div className='nav-links-box'>
          </div>
        </div>
        <Errors errors={this.props.errors} />

        <form onSubmit={this.handleSubmit} className='login-form'>

          <div className='email-address-box'>
            <label>Email address:</label>
            <input
              type='email'
              value={ email }
              onChange={this.handleChange("email")}
              className={ this.props.errors.email ? "input-error" : "" }/>
          </div>

          <div className="password-box">
            <label>Password:</label>
            <input
              type="password"
              value={ password }
              onChange={this.handleChange("password")}
              className={this.props.errors.password ? "input-error" : ""} />
          </div>

          <div className='login-guest-login'>
            <input type="submit" value="Log in" />
            <input className="guest-login" onClick={this.guestLogin("awesome_guest@gmail.com", "passwordsafe")} type="submit" value="Guest" />
          </div>
        </form>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    loggedIn: !!state.session.currentUser,
    errors: state.errors.session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user)),
    clearSessionErrors: () => dispatch(clearSessionErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedirectLogInForm);
