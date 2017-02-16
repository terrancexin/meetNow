import React from 'react';
import { Link } from 'react-router';
import ReactPlayer from 'react-player';
import WelcomeFooter from './welcome_footer';
import WelcomeHeader from './welcome_header';
import WelcomeExplore from './welcome_explore';
import WelcomeVideo from './welcome_video';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='welcome-header-container'>
        <header className='welcome-header'>
          <WelcomeHeader />
        </header>

        <div className='welcome-video'>
          <WelcomeVideo />
        </div>

        <div className='welcome-explore'>
          <WelcomeExplore />
        </div>

        <footer className='welcome-footer'>
          <WelcomeFooter />
        </footer>
      </div>
    );
  }
}

export default Welcome;
