import React from 'react';
import { Link } from 'react-router';
import WelcomeFooter from './welcome_footer';
import WelcomeHeader from './welcome_header';
import WelcomeExplore from './welcome_explore';
import WelcomeVideo from './welcome_video';

class Welcome extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='welcome-container'>
        <div className="welcome-vid">
          <WelcomeVideo />
        </div>

        <div className="explore-div">
          <WelcomeExplore />
        </div>
      </div>
    );
  }
}

export default Welcome;
