import React from 'react';
import { Link, withRouter } from 'react-router';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Terrance",
      password: "123abc"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() => {
      this.props.router.push('/');
    });
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  errors() {
    if (this.props.errors.length > 0) {
      const errorItems = this.props.errors.map((error, idx) => (
        <li key={idx}>{ error }</li>
      ));

      return <ul>{ errorItems }</ul>;
    } else {
      return null;
    }
  }

  render() {
    const { formType } = this.props;
    const { username, password } = this.state;
    const message = formType === "login" ? "Log In" : "Sign Up";

    return (
      <div>

        { this.errors() }

        <form onSubmit={ this.handleSubmit }>
          <input type="text" value={ username } onChange={ this.handleChange("username") } placeholder="username" />
          <input type="password" value={ password } onChange={ this.handleChange("password") } placeholder="password" />
          <input type="submit" value={ message } />
        </form>
      </div>
    );
  }
}

export default withRouter(AuthForm);
