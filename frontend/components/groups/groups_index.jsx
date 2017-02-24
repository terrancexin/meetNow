import React from 'react';
import { connect } from 'react-redux';
import { fetchAllGroups } from '../../actions/group_actions';
import { groupsArray } from '../../reducers/group_reducer';
import { Link } from 'react-router';
import SearchBar from '../search/search_form';

class GroupsIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllGroups();
  }

  render () {
    const sumGroup = this.props.groups.length

    return (
      <div className='group-index-box'>

        <div className='group-banner'>
          <h1>Find a Group</h1>
          <div className='sum-group'>{sumGroup} interesting groups nearby. Go MeetNow!</div>
        </div>
        <SearchBar />



          <ul className='group-index-wrapper'>
            {
              this.props.groups.map(group => {
              if (group.member_count !== 0) {
                return (
                  <li className='group-pics' key={group.id}>
                    <GroupsIndexItems
                      groupId={group.id}
                      name={group.name}
                      members={group.member_count}/>
                  </li>
                  );
                }
              })
            }
          </ul>

      </div>
    );
  }
}

const GroupsIndexItems = ({ groupId, name, members }) => {
  return (
    <Link to={`/groups/${groupId}`} className='group-links'>
        <img src={window.assets.techImage} alt="groups"/>
        <h4 className='group-name'>{name}</h4>
        <p className='member-count'>We're {members} Members</p>


    </Link>
  );
};

const mapStateToProps = state => {
  return ({
    groups: groupsArray(state.groups)
  });
};

const mapDispatchToProps = dispatch => {
  return (
    {
      fetchAllGroups: () => dispatch(fetchAllGroups())
    }
  );

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsIndex);
