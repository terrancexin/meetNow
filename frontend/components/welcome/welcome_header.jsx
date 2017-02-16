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
      formType: null
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.toggleFormType = this.toggleFormType.bind(this);
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

  render(){

    const text = this.props.loggedIn ? "Log out" : "Log in";
    let buttons;
    if (this.props.loggedIn){
      buttons = (<Link onClick={this.handleLogout}>Sign Out</Link>);
    } else {
      buttons = (<Link to="/login">Log in</Link>);
    }

    return(
      <div className='welcome-header'>
        <Link to='/signup' className='create-button'>Create a MeetNow!</Link>
        <Link to='/' className='logo'><img src={window.assets.logo} /></Link>
        <ul>
          <li><label className='language'>Language</label></li>
          <li><Link to='/login' className='login-button'>Log in</Link></li>
          <li><Link to='/signup' className='signup-button'>Sign up</Link></li>
          <li><button onClick={this.openModal("login")}>Log In</button></li>
          <li><button onClick={this.openModal("signup")}>Sign Up</button></li>
        </ul>

        <Modal
           isOpen={this.state.modalOpen}
           onRequestClose={this.closeModal}
           style={modalStyle}
           contentLabel="Example Modal"
         >
         <AuthForm toggleForm={this.toggleFormType} formType={this.state.formType} closeModal={this.closeModal}/>
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
