import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import SignUpForm from '../forms/signup_form';
import LogInForm from '../forms/login_form';

class WelcomeVideo extends React.Component {
  constructor() {
    super();
    this.state = { modalType: "" };
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleModalOpen(form) {
    return () => {
      this.closeModal();
      this.setState({ modalType: form });
    };
  }

  closeModal() {
    this.setState({ modalType: false });
  }

  render () {
    return (
      <div className="splash-main">
        <div className="cover-video">
          <div className="video-div">
            <video
              width="100%"
              id="video-bg"
              alt="covervideo"
              src="https://s3.amazonaws.com/meetnow-DEV/meetNow/cover_video.mp4"
              type="video/mp4"
              loop autoPlay muted />
          </div>

          <div className="video-letters">
            <div>
              <h1>Love something? Why wait.</h1>
              <p>Let's MeetNow!</p>

              { !this.props.loggedIn && <button className='signup-button' onClick={this.handleModalOpen('signup')}>Sign up</button> }
              { this.props.loggedIn && <Link to='/groups' className='video-groups-button'>Let's Go!</Link> }
            </div>
          </div>
        </div>

        <Modal
          overlayClassName='modal-overlay'
          className='modal-container modal-large-signup'
          isOpen={this.state.modalType === "signup"}
          onRequestClose={this.closeModal}
          contentLabel="signup-modal">
          <SignUpForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("login")}/>
        </Modal>

        <Modal
          overlayClassName='modal-overlay'
          className='modal-container'
          isOpen={this.state.modalType === "login"}
          onRequestClose={this.closeModal}
          contentLabel="login-modal">
          <LogInForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("signup")}/>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.session.currentUser
});

export default connect(mapStateToProps)(WelcomeVideo);
