import React from 'react';
import { Link } from 'react-router';
import ReactPlayer from 'react-player';
import WelcomeFooter from './welcome_footer';
import WelcomeHeader from './welcome_header';
import WelcomeExplore from './welcome_explore';
import WelcomeVideo from './welcome_video';
import WelcomeGroups from './welcome_groups';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='welcome-container'>
        <header className='welcome-header-container'>
          <WelcomeHeader />
        </header>

        <div className='welcome-video'>
          <WelcomeVideo />
        </div>


        <div className='welcome-explore'>
          <WelcomeExplore />
        </div>

        <footer className='welcome-footer'>
          <WelcomeFooter pathname={this.props.location.pathname}/>
        </footer>
      </div>
    );
  }
}

export default Welcome;
