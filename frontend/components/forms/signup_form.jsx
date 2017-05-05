import React from 'react';
import { hashHistory } from 'react-router';
import Errors from '../errors/errors';
import { signup, clearSessionErrors } from '../../actions/session_actions';
import { connect } from 'react-redux';

class SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = { first_name: "", email: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.clearSessionErrors();
  }

  handleChange(field) {
    return (event) => this.setState({ [field]: event.currentTarget.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.signup(user).then(() => {
      this.props.closeModal();
      hashHistory.push('/');
    });
  }

  render() {
    const { first_name, email, password } = this.state;

    return (
      <div className='modal-form-container'>
        <div className='form-header'>
          <h1>Sign up</h1><div className='modal-close-x' onClick={this.props.closeModal}>&times;</div>
          <div className='nav-links-box'>
            <div className='nav-link-text'>Already a member?</div>
            <button className='nav-link-button' onClick={this.props.handleModalOpen}>Log in.</button>
          </div>
        </div>
        <Errors errors={ this.props.errors } />

        <form onSubmit={this.handleSubmit} className='signup-form'>
          <div className='name-box'>
            <label>Your name (this is public)</label>
            <input
              type='text'
              value={ first_name }
              onChange={this.handleChange("first_name")}
              className={this.props.errors.first_name ? "input-error" : ""} />
          </div>

          <div className='email-address-box'>
            <label>Email address</label>
            <input
              type="email"
              value={ email }
              onChange={this.handleChange("email")}
              className={this.props.errors.email ? "input-error" : "" } />
          </div>

          <div className='password-box'>
            <label>Password</label>
            <input
              type="password"
              value={ password }
              onChange={this.handleChange("password")}
              className={this.props.errors.password ? "input-error" : "" } />
          </div>

          <input type='submit' value="Sign up" />
        </form>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.session.currentUser,
  errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signup(user)),
  clearSessionErrors: () => dispatch(clearSessionErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);
