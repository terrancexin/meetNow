import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchSingleUser } from '../../actions/user_actions';

class FounderProfile extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchSingleUser(this.props.profileId);
  }

  render() {
    if (this.props.loading) {
      return <div className='group-index-box'><img className='loading-spinner' src='https://s3.amazonaws.com/meetnow-DEV/meetNow/rolling.gif' alt='loading'/></div>
    }
    if (this.props.userDetail.groups) {
      const userDetail = this.props.userDetail
      const userDetailGroups = Object.values(this.props.userDetail.groups)
      const fullName = userDetail.first_name.concat(` ${userDetail.last_name}`);

      return (
        <div className='founder-page-container'>
          <div className='founder-page-box'>
            <div className='profile-left-section'>
              <div className='founder-name'>{fullName}</div>
              <div className='profile-location'>Location:</div>
              <div className='profile-city'>{userDetail.city}</div>
              <div className='founder-bio'>{userDetail.bio}</div>
            </div>

            <div className='founder-right-section'>
              <img src={userDetail.image_url} alt='profile_pic'/>
            </div>

          </div>
        </div>
      );
    } else {
      return <div className='group-index-box'><img className='loading-spinner' src='https://s3.amazonaws.com/meetnow-DEV/meetNow/rolling.gif' alt='loading'/></div>
    }

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

const mapStatetoProps = (state, ownProps) => {
  return ({
    userDetail: state.userDetail,
    loading: state.loading.loading
  })
};

const mapDispatchToProps = dispatch => ({
  fetchSingleUser: id => dispatch(fetchSingleUser(id))
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(FounderProfile);
