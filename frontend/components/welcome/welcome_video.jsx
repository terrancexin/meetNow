import React from 'react';
import { openSignUp, closeSignUp } from '../../actions/modal_actions';
import { videoModalStyle } from './video_sign_style';
import { connect } from 'react-redux';
import VideoSignUp  from '../authform/video_signup_form';
import Modal from 'react-modal';

class WelcomeVideo extends React.Component {
  constructor() {
    super();
    this.state = { formType: 'signup' };
  }

  toggleFormType() {
      this.setState({ formType: "signup"});
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
              src={ window.assets.coverVideoMP4 } type="video/mp4"
              loop autoPlay muted />


          </div>

          <div className="video-letters">
            <div>
              <h1>What do you love?</h1>
              <p>Start your passion with MeetNow!</p>
              <button onClick={this.props.openSignUp}>Sign up</button>
            </div>
          </div>

        </div>

        <Modal
          className='video-modal'
          isOpen={this.props.signUpForm}
          onRequestClose={this.props.closeSignUp}

          contentLabel='video-signup'>

          <VideoSignUp
            toggleForm={this.toggleFormType}
            formType={'signup'}
            closeModal={this.props.closeSignUp}/>
        </Modal>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  signUpForm: state.modal.signUpForm
});

const mapDispatchToProps = dispatch => ({
  openSignUp: () => dispatch(openSignUp()),
  closeSignUp: () => dispatch(closeSignUp())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeVideo);
