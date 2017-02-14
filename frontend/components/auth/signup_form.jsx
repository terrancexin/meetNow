import React from 'react';
import { Link } from 'react-router';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "Terrance", password: "123abc" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.signup(user).then(() => this.redirect());
  }

  redirect() {
    this.props.router.push('/');
  }

  render () {
    return (
      <div className="signup-page">
        <div className="signup-page-container">
          <h1 className="signup-header">
            Sign up
            <pre className='signup-header-text'>Already a member?
              <Link to='/login'>Log in</Link>
            </pre>
          </h1>


        </div>
        <form className="signup-form-box" onSubmit={ this.handleSubmit }>
          <label className="signup-label">Sign Up</label>

        </form>
      </div>
    );
  }
}
