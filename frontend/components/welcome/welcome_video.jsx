import React from 'react';

class WelcomeVideo extends React.Component {
  render () {
    return (
      <div className="splash-main">
        <div className="cover-video">
          <video
            alt="covervideo"
            src={ window.assets.coverVideoMP4 } type="video/mp4"
            loop autoPlay muted />
            <h1>What do you love?</h1>
            <p>Share your passion with MeetNow!</p>
        </div>
      </div>
    );
  }
}

export default WelcomeVideo;
