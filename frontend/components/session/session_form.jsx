import React from 'react';
import { Link, withRouter } from 'react-router';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: "",
        password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGuestLogin = this.handleGuestLogin.bind(this);
    this.displayErrorMessages = this.displayErrorMessages.bind(this);
  }

  componentDidUpdate() {
		this.redirectIfLoggedIn();
    this.resetErrorMessages();
	}

  resetErrorMessages() {
    if (this.props.errors.password !== undefined ||
        this.props.errors.username !== undefined) {
      this.props.errors.password = undefined;
      this.props.errors.username = undefined;
    }
  }

  displayErrorMessages(property) {
    if (property === "username") {
      if (this.props.errors.username !== undefined) {
        return this.props.errors.username.map ((error, idx) => {
          return (
            <h6 key={idx}>{error}</h6>
          );
        });
      }
    } else if (property === "password") {
      if (this.props.errors.password !== undefined) {
        return this.props.errors.password.map ((error, idx) => {
          return (
            <h6 key={idx}>{error}</h6>
          );
        });
      }
    }
  }

  redirectIfLoggedIn() {
		if (this.props.loggedIn) {
			this.props.router.push("/home");
		}
	}

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.processForm(user);
  }

  update(property) {
    return e => (
      this.setState({[property]: e.target.value})
    );
  }

  navLink(){
    if (this.props.formType === "Sign in") {
			return (
        <h5>New to Meet Ups? &nbsp;
          <Link to="/signup">Create account</Link>
        </h5>
      );
		} else {
			return (
        <h5>Already a member? &nbsp;&nbsp;&nbsp;
          <Link to="/login">Sign in</Link>
        </h5>
      );
		}
  }

  handleGuestLogin(e) {
    e.preventDefault();
    this.state = {username: "Terrance", password: "123abc"};
    let user = this.state;
    this.props.login(user);
  }

  render(){
    return (
      <div className="session-container">
        <div className="body">
          <i className="fa fa-meetup fa-5x" aria-hidden="true" onClick={()=>this.props.router.push('/')}></i>
          <h1>{this.props.formType}</h1>
          <div className="session-form">
              <form onSubmit={this.handleSubmit}>
                <div className="auth-form">
                  <div>
                    <input
                      className="input-block"
                      type="text"
                      value={this.state.username}
                      onChange={this.update("username")}
                      placeholder="Username">
                    </input>
                    <div>{this.displayErrorMessages("username")}</div>
                    <input
                      id="password-field"
                      className="input-block"
                      type="password"
                      value={this.state.password}
                      onChange={this.update("password")}
                      placeholder="Password">
                    </input>
                    <div>{this.displayErrorMessages("password")}</div>
                    <button>Submit</button>
                  </div>
                </div>
              </form>
              <div className="margin">&nbsp;</div>
              <div className="session-redirect">
                {this.navLink()}
                <h5>Log in as Guest &nbsp;
                  <button
                    className="guest-button"
                    onClick={this.handleGuestLogin}>Guest Sign in</button>
                </h5>
              </div>

          </div>
          <div className="margin-bot">&nbsp;</div>
        </div>
      </div>
    );
  }
}

export default withRouter(SessionForm);
