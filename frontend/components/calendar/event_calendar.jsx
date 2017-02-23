import React from 'react';
import { connect } from 'react-redux';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllGroups: () => dispatch(fetchAllGroups())
});

export default connect(
  null,
  mapDispatchToProps
)(Calendar);
