import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import CreateGroupForm from '../groups/create_group_form';
import LogInForm from '../forms/login_form';
import SignUpForm from '../forms/signup_form';
import GuestLogIn from '../forms/guest_login_form';

class WelcomeHeader extends React.Component {
  constructor(){
    super();
    this.state = { modalType: "" };
    this.closeModal = this.closeModal.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
  }

  handleLogout(e){
    e.preventDefault();
    logout();
    hashHistory.push('/');
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

  render(){
    const { loggedIn, currentUser } = this.props;
    const { modalType } = this.state;

    return(
      <div className='welcome-header'>

          <div className='left-header-buttons'>
            <Link to='/groups' className='create-button'>Let's MeetNow!</Link>
            { loggedIn &&
              <button
                onClick={this.handleModalOpen("createGroup")}
                className='new-group-button'>
                New Group
              </button> }

            { !loggedIn &&
              <button
                className="guest-login-button"
                onClick={this.handleModalOpen("guest-login")}>
                Guest
              </button> }
          </div>

          <div className='mid-image-logo'>
            <Link to='/' className='logo'>
              <img src={window.assets.logo} />
            </Link>
          </div>

          { loggedIn &&
            <div className='right-header-buttons'>
              <img src={currentUser.image_url}/>
              <button className='signup-button'>{currentUser.first_name}</button>
            </div> }

          { !loggedIn &&
            <div className='right-header-button'>
              <button className='login-button' onClick={this.handleModalOpen("login")}>Log in</button>
              <button className='signup-button' onClick={this.handleModalOpen("signup")}>Sign up</button>
            </div> }

          <Modal
            isOpen={modalType === "signup"}
            onRequestClose={this.closeModal}
            contentLabel="signup-modal">
            <SignUpForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("login")}/>
          </Modal>

          <Modal
            isOpen={modalType === "login"}
            onRequestClose={this.closeModal}
            contentLabel="login-modal">
            <LogInForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("signup")}/>
          </Modal>

          <Modal
            isOpen={modalType === "guest-login"}
            onRequestClose={this.closeModal}
            contentLabel="guest-login-modal">
            <GuestLogIn closeModal={this.closeModal}/>
          </Modal>

          <Modal
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
  currentUser: state.session.currentUser,
  });
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeHeader);
