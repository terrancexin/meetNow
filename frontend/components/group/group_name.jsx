import React from 'react';
import { connect } from 'react-redux';
import { getSingleGroup } from '../../actions/group_actions';

class GroupName extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='group-name-box'>
        {this.props.group.name}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return (
    {
      group: state.groups.selectedGroup
    }
  );
};

const mapDispatchToProps = dispatch => ({
  getSingleGroup: id => dispatch(getSingleGroup(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupName);
