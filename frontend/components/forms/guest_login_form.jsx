import React from 'react';
import { login, clearSessionErrors } from '../../actions/session_actions';
import { connect } from 'react-redux';

class GuestLogIn extends React.Component {
  constructor() {
    super();
    this.state = { email: "", password: "" };
    this.guestLogin = this.guestLogin.bind(this);
  }

  componentWillMount() {
    this.props.clearSessionErrors();
  }

  handleChange(field) {
    return (event) => this.setState({ [field]: event.currentTarget.value});
  }

  guestLogin(email, password) {
    return (event) => {
      event.preventDefault();
      this.props.clearSessionErrors();
      this.setState({ email: "", password: "" }, () => {
        this.typeValue(email, "email", () => {
          this.typeValue(password, "password", () => {
            this.props.login(this.state).then(() => this.props.closeModal());
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
      <div className='modal-form-container'>
        <div className='form-header'>
          <h1 className='guest-login-header'>Guest Log in</h1>
        </div>

        <form className='guest-login-form'>

          <div className='email-address-box'>
            <label>Email address:</label>
            <input
              type='text'
              value={ email }
              onChange={this.handleChange("email")}/>
          </div>

          <div className="password-box">
            <label>Password:</label>
            <input
              type="password"
              value={ password }
              onChange={this.handleChange("password")}/>
          </div>
          <input onClick={this.guestLogin("txin@meetnow.com", "passwordsafe")} type="submit" value="Log in" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
  clearSessionErrors: () => dispatch(clearSessionErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuestLogIn);
