import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { login, logout, signup, clearSessionErrors } from './../../actions/session_actions';

class AuthForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', modalOpen: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderGuest = this.renderGuest.bind(this);
    // this.handleDemoLogin = this.handleDemoLogin.bind(this);

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
    return this.props.errors.map((error, i) => (
      <ul>
        <li key={i}>{error}</li>
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
      return 'Not registered with us yet?';
    } else {
      return 'Already member?';
    }
  }

  navLink() {
    if (this.props.formType === 'login') {
      return <button onClick={this.props.toggleForm}>Sign up</button>;
    } else {
      return <button onClick={this.props.toggleForm}>Log in</button>;
    }
  }

  renderGuest() {
   if (this.props.formType === "login"){
       return <button className="guest-login" onClick={this.setGuest()}>Guest</button>
   }
  }

  componentWillUnmount () {
    window.clearInterval(this.intervalId);
  }

  // handleDemoLogin (e) {
  //   const demo = {
  //     username: 'AppAcademy',
  //     password: 'password'
  //   };
  //   const chars = demo.username.length;
  //
  //   let i = 0;
  //   this.intervalId = window.setInterval(() => {
  //     i++;
  //     if (i <= chars)  {
  //       this.setState({
  //         username: (demo.username.slice(0, i))
  //       });
  //     } else if (i <= demo.password.length + chars){
  //       this.setState({
  //         password: (demo.password.slice(0, i - chars))
  //       });
  //     } else {
  //       // this.handleSubmit();
  //
  //         // e.preventDefault();
  //         const user = this.state;
  //         // debugger
  //         this.props.processForm(user).then(() => {
  //           this.props.closeModal()
  //         });
  //
  //     }
  //   }, 100);

    // return (e) => {
    //   e.preventDefault();
    //   // this.props.submitForm(guest)
    //   //   .then(this.redirect);
    //   this.props.closeModal();
    // };
  // }

  setGuest() {
    return e => this.setState({
      username: "Terrance",
      password: "123abc",
    });
  }

  render() {
      return (
        <div className='auth-form-container'>
          <form onSubmit={this.handleSubmit} className='auth-form-box'>
            <div className='auth-form'>
                <div className='form-text'>
                  <h1 className="auth-form-header">{this.headerText()}</h1>
                  <label className='nav-text'>{this.navText()}</label>
                  <label className='nav-link'>{this.navLink()}</label>
                </div>

              <div className='auth-form-errors'>{this.errorHandling()}</div>
              <div className='login-labels'>
                <label htmlFor='username'>Username:</label>
                <input id='username'
                       type='text'
                       value={this.state.username}
                       onChange={this.update('username')}
                       className='auth-input'/>
                     <label htmlFor='password'>Password:</label>
                  <input id='password'
                         type='password'
                         value={this.state.password}
                         onChange={this.update('password')}
                         className='auth-input'/>
                       <div className='submit-btn-wrapper'>
                         <input type='submit' value={this.submitButtonText()} className='login-button' />

                         {this.renderGuest()}
                       </div>

              </div>
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
)(AuthForm);
