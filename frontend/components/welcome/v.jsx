import React from 'react';

class WelcomeVideo extends React.Component {
  constructor() {
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      modalOpen: false,
    };
    
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  closeModal() {
    this.setState({ modalOpen: false});
  }

  openModal(formType) {
    return () => {
      this.setState({ modalOpen: true, formType: formType});
    };
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
              <p>Share your passion with MeetNow!</p>
              <button>Sign up</button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default WelcomeVideo;
