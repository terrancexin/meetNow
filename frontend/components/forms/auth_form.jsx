import React from 'react';
import { withRouter } from 'react-router';
import AuthField from './auth_field';
import ErrorList from './errors';

class AuthForm extends React.Component {
  constructor (props) {
    super(props);

    let fields = ['username', 'password'];
    if (this.props.formType === 'signUp') { fields.push('name'); }

    let startState = {};
    fields.forEach((field) => (startState[field] = ''));

    this.state = startState;

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentWillUnmount () {
    window.clearInterval(this.intervalId);
  }

  update (field) {
    return (e) => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  handleSubmit (e) {
    if (e) { e.preventDefault(); }
    this.props.submitForm(Object.assign({}, this.state))
    .then(this.redirect);
  }

  handleDemoLogin (e) {
    const demo = {
      username: 'App Academy NYC',
      password: 'password'
    };
    const chars = demo.email.length;

    let i = 0;
    this.intervalId = window.setInterval(() => {
      i++;
      if (i <= chars)  {
        this.setState({
          username: (demo.username.slice(0, i))
        });
      } else if (i <= demo.password.length + chars){
        this.setState({
          password: (demo.password.slice(0, i - chars))
        });
      } else {
        this.handleSubmit();
      }
    }, 100);

    return (e) => {
      e.preventDefault();
      this.props.submitForm(demoUser)
        .then(this.redirect);
    };
  }

  redirect () {
    this.props.router.push('/groups');
  }

  render () {
    const { formType, errors } = this.props;

    return (
      <div className='modal-form modal-form-narrow'>
        <form onSubmit={ this.handleSubmit }>

          { formType === 'logIn' &&
            <div
              className='demo-log-in'
              onClick={ this.handleDemoLogin }>Guest</div>
          }

          { formType === 'logIn' &&
            <div className='form-divider'>
              <div className='form-divider-line'></div>
              <span className='form-or'>or</span>
              <div className='form-divider-line'></div>
            </div>
          }

          <AuthField field='username'
            update={ this.update }
            value={ this.state.username }
            formType={ formType } />
          <ErrorList errors={ errors.username } />

          { formType === 'signUp' &&
            <AuthField field='name'
              update={ this.update }
              value={ this.state.name }
              formType={ formType } />
            }
          <ErrorList errors={ errors.name } />

          <AuthField field='password'
            update={ this.update }
            value={ this.state.password }
            formType={ formType } />
          <ErrorList errors={ errors.password } />
          <ErrorList errors={ errors.login } />

          <input type='submit' value="Let's MeetNow!" />
        </form>
      </div>
    );
  }
}

export default withRouter(AuthForm);
