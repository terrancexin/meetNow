import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchAllEvents, attendEvent, leave } from '../../actions/event_actions';
import { eventsArray } from '../../reducers/event_reducer';

class EventsIndex extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    if (this.props.events) {
      const eventArray = Object.keys(this.props.events).map(id => this.props.events[id]);
      return (
        <div>
            {
              eventArray.map(event => (
              <ul className='events-box-on-group' key={event.id}>
                <div className='event-time'><li>{event.time}</li></div>
                <div className='event-title'>
                  <Link to={`groups/${this.props.groupId}/events/${event.id}`}>{event.name}</Link>
                </div>


                <div className='rsvp-flex'>
                  <ul className='attendee-box'>
                      {Object.keys(event.attendees).map(id => event.attendees[id]).map(attendee => (
                        <li key={attendee.id}>
                          <div className='attendee-wrapper'>
                            <img className='attendee-pic' src={window.assets.memberlistImage} />
                          </div>
                        </li>

                    ))}
                  </ul>

                  {
                    this.props.isMember && <Link className='rsvp-button' to={`groups/${this.props.groupId}/events/${event.id}`}>RSVP</Link>
                  }
                  {
                    !this.props.isMember && <button onClick={this.props.handleJoinGroup} className="join-group-button">Join us!</button>
                  }

                </div>


                <div className='going-box'>
                  <div>
                    <li className='event-location'>Location: {event.location}</li>
                    <li className='event-description'>{event.description}</li>
                  </div>

                  <div className='count-going'>{Object.keys(event.attendees).map(id => event.attendees[id]).length} going</div>
                </div>

              </ul>

            ))
          }


        </div>
      );
    } else {
      return <div className='loading-no-event'>No events</div>;
    }
  }
}

export default EventsIndex;
