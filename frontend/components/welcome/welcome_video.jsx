import React from 'react';

class WelcomeVideo extends React.Component {
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
