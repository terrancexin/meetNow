import React from 'react';
import { connect } from 'react-redux';
import { fetchAllGroups } from '../../actions/group_actions';
import { groupsArray } from '../../reducers/group_reducer';
import { Link } from 'react-router';

class GroupsIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllGroups();
  }

  render () {
    return (
      <ul className='group-index-wrapper'>
        {
          this.props.groups.map(group => {
          return <li key={group.id}>
            <Link className='group-index' to={`/groups/${group.id}`}>{group.name}</Link>
          </li>;
        })
      }
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return ({
    groups: groupsArray(state.groups.allGroups)
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
