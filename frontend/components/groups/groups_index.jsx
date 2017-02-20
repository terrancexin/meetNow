import React from 'react';
import { connect } from 'react-redux';
import { fetchAllGroups } from '../../actions/group_actions';
import { groupsArray } from '../../reducers/group_reducer';
import { Link } from 'react-router';
import WelcomeExplore from '../welcome/welcome_explore';

class GroupsIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllGroups();
  }

  render () {
    return (

    <div>
      <h1 className='group-banner'>Groups</h1>
        <ul className='group-index-wrapper'>
          {
            this.props.groups.map(group => {
            return (
              <li className='group-pics' key={group.id}>
                <GroupsIndexItems
                  groupId={group.id}
                  name={group.name}
                  members={group.member_count}
                  />
              </li>
            );
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
        <h4 className='group-name'>{name}</h4>
        <p className='member-count'>We're {members} Members</p>
        <img src={window.assets.aaImage} alt="groups"/>
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
