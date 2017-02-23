import React from 'react';
import { connect } from 'react-redux';
import { fetchEvent, attendEvent, leaveEvent } from '../../actions/event_actions';

class EventShow extends React.Component {
  constructor(props) {
    super(props);
    this.handleAttendEvent = this.handleAttendEvent.bind(this);
    this.handleLeaveEvent = this.handleLeaveEvent.bind(this);
    this.attendButton = this.attendButton.bind(this);
  }

  // componentWillReceiveProps(newProps) {
  //   if (this.props.params.eventId !== newProps.params.eventId) {
  //     this.props.fetchEvent(newProps.params.groupId);
  //   }
  // }

  componentDidMount() {
    this.props.fetchEvent(this.props.params.eventId);
  }

  handleAttendEvent(e) {
    e.preventDefault();
    this.props.attendEvent(this.props.event.id);
  }

  handleLeaveEvent(e) {
    e.preventDefault();
    this.props.leaveEvent(this.props.event.id);
  }


  attendButton() {
    if (this.props.currentUser) {
      if (Object.keys(this.props.event.users).includes(`${this.props.currentUser.id}`)) {
        return <button onClick={this.handleLeaveEvent} className='attend-event-button'>Not Attending</button>;
      } else {
        return <button onClick={this.handleAttendEvent} className='attend-event-button'>Attend</button>;
      }
    } else {
      return <button onClick={this.handleLeaveEvent} className='attend-event-button'>Not Attending</button>;
    }
  }


  render() {
    if (this.props.event) {
      return (
        <div className='event-show-container'>
            <li>{this.props.event.name}</li>
            <li>{this.props.event.description}</li>
            <li>{this.props.event.location}</li>
            <li>{this.props.event.time}</li>
            <li>Attending: {this.props.event.rsvp_count}</li>
            {this.attendButton()}
      </div>

      );

    } else {
      return <div>404</div>;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return({
    event: state.events[ownProps.params.eventId],
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.session.currentUser
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return(
    {
      fetchEvent: id => dispatch(fetchEvent(id)),
      attendEvent: (eventId) => dispatch(attendEvent(eventId)),
      leaveEvent: (eventId) => dispatch(leaveEvent(eventId))
    }
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventShow);
