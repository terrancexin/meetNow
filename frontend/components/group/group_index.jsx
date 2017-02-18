import React from 'react';
import { connect } from 'react-redux';
import { fetchAllGroups } from '../../actions/group_actions';
import { groupsArray } from '../../reducers/group_reducer';
import CreateGroupForm from './group_form';

class GroupIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllGroups();
  }

  render () {
    return (
      <ul>
        {
          this.props.groups.map(group => {
          return <li key={group.id}>{group.name}
            <br/>
            {group.description}
          </li>;
        })
      }
      <CreateGroupForm />
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
)(GroupIndex);
