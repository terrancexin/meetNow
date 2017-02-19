import React from 'react';
import { Link } from 'react-router';
import GroupsHeader from './groups_header';
import GroupsIndex from './groups_index';

class Groups extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='welcome-container'>
        <header className='groups-header-container'>
          <GroupsHeader />
          <GroupsIndex />
        </header>
      </div>
    );
  }
}

export default Groups;
