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


  render(){

    return(
      <div className='welcome-header'>
        <div><Link to='/signup' className='create-button'>Start a MeetNow!</Link></div>
        <div><Link to='/' className='logo'><img src={window.assets.logo} /></Link></div>
        <ul className='header-buttons'>
          <li><Link to='/login' className='guest-button' onClick={this.setGuest}>Guest</Link></li>
          <li><button className='login-button' onClick={this.openModal("login")}>Log In</button></li>
          <li><button className='signup-button' onClick={this.openModal("signup")}>Sign Up</button></li>
        </ul>

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
