import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';

// Forms
import Modal from 'react-modal';
import SignUpForm from '../forms/signup_form';
import LogInForm from '../forms/login_form';

class WelcomeVideo extends React.Component {
  constructor() {
    super();
    this.state = { modalOpen: false, modalType: "" };
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  render () {
    const forms = {
      'login': <LogInForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("signup")} />,
    'signup': <SignUpForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("login")} /> }

    return (
      <div className="splash-main">
        <div className="cover-video">
          <div className="video-div">
            <video
              width="2120"
              id="video-bg"
              alt="covervideo"
              src="https://s3.amazonaws.com/meetnow-DEV/meetNow/cover_video.mp4"
              type="video/mp4"
              loop autoPlay muted />
          </div>

          <div className="video-letters-box">
            <h1 className='love-something'>Love something? Why wait.</h1>

            { !this.props.loggedIn && <button className='video-button' onClick={this.handleModalOpen('signup')}>Sign up</button> }
            { this.props.loggedIn && <Link to='/groups' className='video-button'>Let's MeetNow!</Link> }
          </div>
        </div>

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
  loggedIn: !!state.session.currentUser
});

export default connect(mapStateToProps)(WelcomeVideo);
