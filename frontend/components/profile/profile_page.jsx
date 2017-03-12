import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ProfilePage extends React.Component {
  constructor() {
    super();
  }


  render() {
    const currentUser = this.props.currentUser;
    const fullName = currentUser.first_name.concat(` ${currentUser.last_name}`);

    return (
      <div className='profile-page-container'>
        <div className='profile-page-box'>

          <div className='profile-left-section'>
            <div className='profile-name'>{fullName}</div>
            <div className='profile-location'>Location:</div>
            <div className='profile-city'>{currentUser.city}</div>
            <div className='profile-bio'>{currentUser.bio}</div>
            <div className='profile-group-member-count'>Member of {this.props.groups.length} Groups</div>
            <div className='profile-groups'>{this.props.groups.map(group => {
                return <div key={group.id}><ProfileGroupsInfo group={group}/></div>
              })}</div>
          </div>

          <div className='profile-right-section'>
            <img src={currentUser.image_url} alt='profile_pic'/>
          </div>

        </div>
      </div>
    );
  }
}

const ProfileGroupsInfo = ({ group }) => {
  return (
    <div className='profile-groups-box' key={group.id}>
      <Link to={`/groups/${group.id}`}><img width='70px' height='70px' className='profile-group-thumb' src={group.photo_url} alt='group-photo'/></Link>
      <div className='group-name-member-count'>
        <Link to={`/groups/${group.id}`}><label>{group.name}</label></Link>
        <div className='profile-group-members-count'>Members: {group.member_count}</div>
      </div>
    </div>

  );
}

const mapStatetoProps = state => ({
  currentUser: state.session.currentUser,
  groups: Object.values(state.session.currentUser.groups)
});

export default connect(
  mapStatetoProps,
  null
)(ProfilePage);
