import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchAllEvents, attendEvent, leave } from '../../actions/event_actions';
import { eventsArray } from '../../reducers/event_reducer';

class EventCalendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.events) {
      const eventArray = Object.keys(this.props.events).map(id => this.props.events[id]);
      return (
        <div className='calendar-wrapper'>
            {
              eventArray.map(event => (
              <ul className='calendar-box-on-group animated fadeInRight' key={event.id}>
                <div className='calendar-time'>{event.time.slice(0, 10)}</div>
                <Link className='calendar-title' to={`groups/${event.group_id}/events/${event.id}`}>{event.name}</Link>

                <div className='calendar-rsvp-flex'>
                  <div className='calendar-attendee-box'>
                    { Object.keys(event.attendees).map(id => event.attendees[id]).map(attendee => (
                      <img className='calendar-attendee-pic' src={attendee.image} key={attendee.id} />
                    ))}
                  </div>

                  <div className='calendar-going-box'>
                    <Link className='calendar-rsvp-button' to={`groups/${event.group_id}/events/${event.id}`}>RSVP</Link>
                    <div className='calendar-count-going'>{Object.keys(event.attendees).map(id => event.attendees[id]).length} going</div>
                  </div>
                </div>

                <div className='location-description'>
                  <li className='calendar-event-location'>Location: {event.location}</li>
                  <li className='calendar-event-description'>{event.description}</li>
                </div>
              </ul>
            ))}
        </div>
      );
    } else {
      return <div className='calendar-loading-no-event'>No events</div>;
    }
  }
}

export default EventCalendar;
