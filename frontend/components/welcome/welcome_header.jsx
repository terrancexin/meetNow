import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Modal from 'react-modal';
import AuthForm from '../authform/auth_form';
import modalStyle from './modalStyle';

class WelcomeHeader extends React.Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      modalOpen: false,
      formType: null,
      username: '',
      password: ''
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.toggleFormType = this.toggleFormType.bind(this);
    this.setGuest = this.setGuest.bind(this);
  }

  handleLogout(e){
    e.preventDefault();
    this.props.logout();
    hashHistory.push('/');
  }

  toggleFormType(e) {
    e.preventDefault();
    if (this.state.formType === "login") {
      this.setState({ formType: "signup"});
    } else {
      this.setState({ formType: "login" });
    }
  }

  closeModal() {
    this.setState({ modalOpen: false});
  }

  openModal(formType) {
    return () => {
      this.setState({ modalOpen: true, formType: formType});
    };
  }

  setGuest() {
    this.setState({username: 'AppAcademy', password: '123abc'});
  }
  // componentWillUnmount () {
  //   window.clearInterval(this.intervalId);
  // }

  // handleDemoLogin (e) {
  //   const demo = {
  //     username: 'AppAcademy',
  //     password: 'password'
  //   };
  //   const chars = demo.email.length;
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
  //       this.handleSubmit();
  //     }
  //   }, 100);
  //
  //   return (e) => {
  //     e.preventDefault();
  //     this.props.submitForm(guest)
  //       .then(this.redirect);
  //   };
  // }

  render(){
    if (this.props.loggedIn) {

    }

    return(
      <div className='welcome-header'>
        <div>
          {
            !this.props.loggedIn && <ul className='ul-create-button'><Link to='/groups' className='create-button'>Start a MeetNow!</Link></ul>
          }

          {
            this.props.loggedIn && <ul className='ul-create-button'><Link to='/groupsform' className='create-button'>Start a MeetNow!</Link></ul>
          }

          <div><Link to='/' className='logo'><img src={window.assets.logo} /></Link></div>
            { !this.props.loggedIn &&
              <ul className='header-buttons'>
                <li><button className='login-button' onClick={this.openModal("login")}>Log in</button></li>
                <li><button className='signup-button' onClick={this.openModal("signup")}>Sign up</button></li>
              </ul>
            }

           { this.props.loggedIn &&   <ul className='header-buttons'><li><button className='signup-button' onClick={this.openModal("signup")}>Profile</button></li></ul>}
        </div>

        <Modal
           isOpen={this.state.modalOpen}
           onRequestClose={this.closeModal}
           style={modalStyle}
           contentLabel="header-modal"
         >
         <AuthForm
           toggleForm={this.toggleFormType}
           formType={this.state.formType}
           closeModal={this.closeModal}/>
       </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
  loggedIn: Boolean(state.session.currentUser),
  errors: state.session.errors,
  currentUser: state.session.currentUser
  });
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeHeader);
