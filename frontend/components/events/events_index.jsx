import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchAllEvents } from '../../actions/event_actions';

class EventsIndex extends React.Component {

  componentDidMount() {
    this.props.fetchAllEvents();
  }

  render() {
    return (
      <div>
        <ul>
          events
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    events: state.events
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    fetchAllEvents: () => dispatch(fetchAllEvents())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsIndex);
