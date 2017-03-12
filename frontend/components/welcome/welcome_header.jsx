import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import CreateGroupForm from '../forms/create_group_form';
import LogInForm from '../forms/login_form';
import SignUpForm from '../forms/signup_form';
import GuestLogIn from '../forms/guest_login_form';
// import ProfileForm from '../forms/profile_form';
import { logout } from '../../actions/session_actions';

class WelcomeHeader extends React.Component {
  constructor(){
    super();
    this.state = { modalType: "", profile: false };
    this.closeModal = this.closeModal.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.toggleProfile = this.toggleProfile.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleProfileButton = this.handleProfileButton.bind(this);
  }

  handleLogout(){
    this.handleProfile();
    this.props.logout();
    hashHistory.push('/');
  }

  handleProfileButton() {
    this.handleProfile();
    hashHistory.push('/profile');
  }

  closeModal() {
    this.setState({ modalType: false});
  }

  handleModalOpen(form) {
    return () => {
      this.closeModal();
      this.setState({ modalType: form });
    };
  }

  handleProfile() {
    this.setState({ profile: !this.state.profile });
    this.toggleProfile();
  }

  toggleProfile() {
    if (this.state.profile) {
      return { visibility: 'visible' };
    } else {
      return { visibility: 'hidden' };
    }
  }

  render(){
    const { loggedIn, currentUser } = this.props;
    const { modalType } = this.state;

    return(
      <div className='welcome-header'>

          <div className='left-header-buttons'>
            <Link to='/groups' className='meetnow-button'>Let's MeetNow!</Link>
            { loggedIn &&
              <button onClick={this.handleModalOpen("createGroup")}
                className='new-group-button'>New Group</button> }

            { !loggedIn &&
              <button className="guest-login-button"
                onClick={this.handleModalOpen("guest-login")}>Guest Login</button> }
          </div>

          <div className='mid-image-logo'>
            <Link to='/' className='logo'>
              <img src={window.assets.logo} />
            </Link>
          </div>

          { loggedIn &&
            <div className='right-header-buttons'>
              <label className='welcome-msg'>Welcome, {currentUser.first_name}</label>
              <img  onClick={this.handleProfile} className="profile-thumbnail" src={currentUser.image_url}/>
              <div  style={this.toggleProfile()} className='profile-form-box' >
                <div className='profile-buttons-box'>
                  <button className='profile-buttons' onClick={this.handleProfileButton}>Profile</button>
                  <button className='profile-buttons' onClick={this.handleLogout}>Log out</button>
                </div>
              </div>
            </div> }

          { !loggedIn &&
            <div className='right-header-buttons'>
              <button className='login-button' onClick={this.handleModalOpen("login")}>Log in</button>
              <button className='signup-button' onClick={this.handleModalOpen("signup")}>Sign up</button>
            </div> }

          <Modal
            overlayClassName='modal-overlay'
            className='modal-container modal-large-signup'
            isOpen={modalType === "signup"}
            onRequestClose={this.closeModal}
            contentLabel="signup-modal">
            <SignUpForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("login")}/>
          </Modal>

          <Modal
            overlayClassName='modal-overlay'
            className='modal-container'
            isOpen={modalType === "login"}
            onRequestClose={this.closeModal}
            contentLabel="login-modal">
            <LogInForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("signup")}/>
          </Modal>

          <Modal
            overlayClassName='modal-overlay'
            className='modal-container'
            isOpen={modalType === "guest-login"}
            onRequestClose={this.closeModal}
            contentLabel="guest-login-modal">
            <GuestLogIn closeModal={this.closeModal}/>
          </Modal>

          <Modal
            overlayClassName='modal-overlay'
            className='modal-container large-modal'
            isOpen={modalType === "createGroup"}
            onRequestClose={this.closeModal}
            contentLabel="create-group-modal">
            <CreateGroupForm closeModal={this.closeModal}/>
          </Modal>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
  loggedIn: !!state.session.currentUser,
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
