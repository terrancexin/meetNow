import React from 'react';
import { connect } from 'react-redux';
import { fetchEvent, attendEvent, leaveEvent } from '../../actions/event_actions';
import LogInForm from '../forms/login_form';
import SignUpForm from '../forms/signup_form';
import Modal from 'react-modal';

class EventShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalType: "", profile: false };
    this.closeModal = this.closeModal.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);

    this.handleAttendEvent = this.handleAttendEvent.bind(this);
    this.handleLeaveEvent = this.handleLeaveEvent.bind(this);
    this.attendButton = this.attendButton.bind(this);
  }

  // componentWillReceiveProps(newProps) {
  //   if (this.props.params.eventId !== newProps.params.eventId) {
  //     this.props.fetchEvent(newProps.params.groupId);
  //   }
  // }
  closeModal() {
    this.setState({ modalType: false});
  }

  handleModalOpen(form) {
    return () => {
      this.closeModal();
      this.setState({ modalType: form });
    };
  }

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
    if(!this.props.loggedIn) {
      return (<button className='attend-event-button' onClick={this.handleModalOpen("login")}>Log in</button>);
    }

    if (this.props.currentUser) {
      if (Object.keys(this.props.event.attendees).includes(`${this.props.currentUser.id}`)) {
        return <button onClick={this.handleLeaveEvent} className='attend-event-button'>Going</button>;
      } else {
        return <button onClick={this.handleAttendEvent} className='attend-event-button'>Not going</button>;
      }
    } else {
      return <button onClick={this.handleLeaveEvent} className='attend-event-button'>Not going</button>;
    }
  }


  render() {
    if (this.props.event) {
      return (
        <div className='mid-content-box'>
          <div className='event-show-description'>
            <div className='event-info-box'>
              <div className='event-show-name'><li>{this.props.event.name}</li></div>
              <div className='event-show-date'><li>Friday, March 17, 2017</li></div>
              <div className='event-show-time'><li>6:00 PM</li></div>
              <div className='event-show-location'><li>Location: {this.props.event.location}</li></div>
              <div className='event-show-attending'><li>Attending: {this.props.event.rsvp_count}</li></div>
              <div className='event-show-description'><li className='event-description'>{this.props.event.description}</li></div>
                {this.attendButton()}
            </div>
        </div>

        <Modal
          overlayClassName='modal-overlay'
          className='modal-container modal-large-signup'
          isOpen={this.state.modalType === "signup"}
          onRequestClose={this.closeModal}
          contentLabel="signup-modal">
          <SignUpForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("login")}/>
        </Modal>

        <Modal
          overlayClassName='modal-overlay'
          className='modal-container'
          isOpen={this.state.modalType === "login"}
          onRequestClose={this.closeModal}
          contentLabel="login-modal">
          <LogInForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("signup")}/>
        </Modal>
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
