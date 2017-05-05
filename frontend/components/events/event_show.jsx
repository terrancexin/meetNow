import React from 'react';
import { connect } from 'react-redux';
import { fetchEvent, attendEvent, leaveEvent } from '../../actions/event_actions';
import LogInForm from '../forms/login_form';
import SignUpForm from '../forms/signup_form';
import Modal from 'react-modal';
import { Link } from 'react-router';
import EventMap from './event_map';

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

  closeModal() {
    this.setState({ modalType: false});
  }

  handleModalOpen(form) {
    return () => {
      this.closeModal();
      this.setState({ modalType: form });
    };
  }

  componentWillMount() {
    this.props.fetchEvent(this.props.params.eventId);
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
      return (<div className='rsvp-buttons-box-login'><button className='attend-event-button' onClick={this.handleModalOpen("login")}>Log in</button></div>);
    }

      if (Object.keys(this.props.event.attendees).includes(`${this.props.currentUser.id}`)) {
        return (
          <div>
          <div className='rsvp-buttons-box'>
            <div className='your-rsvp-text'>Your RSVP:</div>
              <button onClick={this.handleLeaveEvent} className='attend-event-button yes-btn'>Yes</button>
          </div>

          <div className='event-show-attending'>{this.props.event.rsvp_count} going</div>

            <div className='event-members-list'>
              <ul className='event-members'>
              {
                Object.keys(this.props.event.attendees).map(id => (

                  <div className='member-and-pic-box' key={id}>
                    <div className='pro-pic-box'>
                      <Link to={`/profile/${id}`}><img className='pro-pic' src={this.props.event.attendees[id].image} /></Link>
                    </div>

                    <Link to={`/profile/${id}`}><div className='member-name'>
                      {this.props.event.attendees[id].first_name}
                    </div></Link>

                  </div>
                ))
              }
              </ul>
            </div>

        </div>
        );
      } else {
        return (
          <div><div className='rsvp-buttons-box'>
            <div className='your-rsvp-text'>Your RSVP:</div>
              <button onClick={this.handleAttendEvent} className='attend-event-button no-btn'>No</button>
          </div>
          <div className='event-show-attending'>{this.props.event.rsvp_count} going</div>

            <div className='event-members-list'>
              <ul className='event-members'>
              {
                Object.keys(this.props.event.attendees).map(id => (

                  <div className='member-and-pic-box' key={id}>
                    <div className='pro-pic-box'>
                      <Link to={`/profile/${id}`}><img className='pro-pic' src={this.props.event.attendees[id].image} /></Link>
                    </div>

                    <Link to={`/profile/${id}`}><div className='member-name'>
                      {this.props.event.attendees[id].first_name}
                    </div></Link>

                  </div>
                ))
              }
              </ul>
            </div>


          </div>
        );
      }
  }


  render() {
    if (this.props.loading) {
      return (<img className='loading-spinner' src='https://s3.amazonaws.com/meetnow-DEV/meetNow/rolling.gif' alt='loading'/>);
    }

    if (this.props.event) {
      return (
        <div className='event-mid-content-box'>
          <div className='event-show-left-right'>
            <div className='event-info-box'>
              <div className='event-show-name'><li>{this.props.event.name}</li></div>
              <div className='event-show-date'><li>{this.props.event.time.slice(0, 10)}</li></div>
              <div className='event-show-time'><li><i className="fa fa-clock-o fa-2x"></i>6:00 PM</li></div>
              <div className='event-show-location'><li><i className="fa fa-map-marker fa-2x"></i>{this.props.event.location}</li></div>
              <div className='event-show-map'><li><EventMap latitude={this.props.event.latitude} longitude={this.props.event.longitude}/></li></div>
              <div className='event-show-inner-description'><li className='event-show-description'>{this.props.event.description}</li></div>
            </div>

            <div className='event-show-right-side'>
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
    loggedIn: !!state.session.currentUser,
    currentUser: state.session.currentUser,
    loading: state.loading.loading
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
