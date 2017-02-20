import React from 'react';
import { Link } from 'react-router';
import WelcomeHeader from '../welcome/welcome_header';
import GroupsIndex from './groups_index';

class Groups extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='welcome-container'>
        <header className='groups-header-container'>
          <WelcomeHeader />
          <GroupsIndex />
        </header>
      </div>
    );
  }
}

export default Groups;
