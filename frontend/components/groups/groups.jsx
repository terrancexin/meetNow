import React from 'react';
import { Link } from 'react-router';
import GroupsIndex from './groups_index';

class Groups extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='welcome-container'>
        <header className='groups-header-container'>
          <GroupsIndex />
        </header>
      </div>
    );
  }
}

export default Groups;
