import React from 'react';

class WelcomeVideo extends React.Component {
  render () {
    return (
      <div className="splash-main">
        <div className="hero-video">
          <video
            alt="covervideo"
            src={ window.assets.coverVideoMP4 } type="video/mp4"
            loop autoPlay muted />
        </div>
        <div className='text-on-video'>
          <p>What do you love?</p>
          <p>Do it now!</p>
        </div>
      </div>
    );
  }
}

export default WelcomeVideo;
