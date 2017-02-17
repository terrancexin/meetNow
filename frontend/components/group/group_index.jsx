import React from 'react';
import { connect } from 'react-redux';
import { getAllGroups } from '../../actions/group_actions';
import { groupsArray } from '../../reducers/group_reducer';

class GroupIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllGroups();
  }

  render () {
    return (
      <ul>
        {
          this.props.groups.map(group => {
          return <li>{group.name}
            <br/>
            {group.description}
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
      getAllGroups: () => dispatch(getAllGroups())
    }
  );

};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupIndex);
