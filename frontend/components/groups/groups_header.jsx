import React from 'react';
import { Link } from 'react-router';
import GroupsForm from './groups_header';
import CreateButton from '../buttons/create_button';

const GroupsHeaderButtons = ({ loggedIn }) => (
  <div className='groups-header-buttons'>
    <CreateButton />
  </div>
);


class GroupsHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul className="groups-header">
          <li><Link to="groupsform" className='create-button'>Create MeetNow!</Link></li>
          <div><Link to='/' className='logo'><img src={window.assets.logo} /></Link></div>
          <li>Profile</li>
        </ul>
      </div>
    );
  }
}

export default GroupsHeader;
