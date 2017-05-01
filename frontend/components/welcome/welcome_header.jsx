import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

// Forms
import Modal from 'react-modal';
import CreateGroupForm from '../forms/create_group_form';
import LogInForm from '../forms/login_form';
import SignUpForm from '../forms/signup_form';
import ProfileModal from '../forms/profile_modal';

class WelcomeHeader extends React.Component {
  constructor(){
    super();
    this.state = { modalOpen: false,
                   modalType: "",
                   profile: false };

    this.closeModal = this.closeModal.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleCreateGroup = this.toggleCreateGroup.bind(this);
    this.toggleProfileView = this.toggleProfileView.bind(this);
    this.handleProfileButton = this.handleProfileButton.bind(this);
  }

  handleProfileButton(id) {
    return () => { hashHistory.push(`profile/${id}`) }
  }

  handleLogout(){
    this.props.logout();
    hashHistory.push('/');
  }

  closeModal() {
    this.setState({ modalOpen: false});
  }

  handleModalOpen(form) {
    return () => {
      this.closeModal();
      this.setState({ modalOpen: true, modalType: form });
    };
  }

  toggleCreateGroup(formType) {
    return (
      <button
        onClick={this.handleModalOpen(formType)}
        className='new-group-button'
        >Create a Group
      </button>
    );
  }

  toggleProfileView() {
    const { loggedIn, currentUser } = this.props;

    if (loggedIn) {
      return (
        <div className='header-right'>
          <label className='welcome-msg'>Welcome, {currentUser.first_name}</label>
          <img className="profile-thumbnail" onClick={this.handleModalOpen("profile")} src={currentUser.image_url}/>
        </div>
      );
    } else {
      return (
        <div className='header-right'>
          <button className='login-button' onClick={this.handleModalOpen("login")}>Log in</button>
          <button className='signup-button' onClick={this.handleModalOpen("signup")}>Sign up</button>
        </div>
      );
    }
  }

  render(){
    const formType = this.props.loggedIn ? 'createGroup' : 'signup';
    const forms = {
      'login': <LogInForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("signup")} />,
      'signup': <SignUpForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("login")} />,
      'createGroup': <CreateGroupForm closeModal={this.closeModal} />,
      'profile': this.props.loggedIn && <ProfileModal closeModal={this.closeModal} handleLogout={this.handleLogout}
                 handleProfileButton={this.handleProfileButton}
                 currentId={this.props.currentUser.id} /> }

    return (
      <div className='welcome-header'>
          <div className='header-left'>
            <Link to='/groups' className='meetnow-button'>Let's MeetNow!</Link>
            { this.props.loggedIn ? this.toggleCreateGroup(formType) : this.toggleCreateGroup(formType) }
          </div>

          <div className='header-mid'>
            <Link to='/' className='header-logo-name'>MeetNow!</Link>
          </div>

          { this.toggleProfileView() }

          <Modal
            overlayClassName='modal-overlay'
            className={`modal-container modal-${this.state.modalType}`}
            isOpen={this.state.modalOpen}
            onRequestClose={this.closeModal}
            contentLabel="header-modals">
            {forms[this.state.modalType]}
          </Modal>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  loggedIn: !!state.session.currentUser,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeHeader);
