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
        <div>
            {
              eventArray.map(event => (
              <ul className='calendar-box-on-group' key={event.id}>
                <div className='calendar-time'><li>{event.time.slice(0, 10)}</li></div>
                <div className='calendar-title'>
                  <Link to={`groups/${event.group_id}/events/${event.id}`}>{event.name}</Link>
                </div>


                <div className='calendar-rsvp-flex'>
                  <ul className='calendar-attendee-box'>
                      {Object.keys(event.attendees).map(id => event.attendees[id]).map(attendee => (
                        <li key={attendee.id}>
                          <div className='calendar-attendee-wrapper'>
                            <img className='calendar-attendee-pic' src={attendee.image} />
                          </div>
                        </li>

                    ))}
                  </ul>

                  <Link className='calendar-rsvp-button' to={`groups/${event.group_id}/events/${event.id}`}>RSVP</Link>

                </div>


                <div className='calendar-going-box'>
                  <div>
                    <li className='calendar-event-location'>Location: {event.location}</li>
                    <li className='calendar-event-description'>{event.description}</li>
                  </div>

                  <div className='calendar-count-going'>{Object.keys(event.attendees).map(id => event.attendees[id]).length} going</div>
                </div>

              </ul>

            ))
          }


        </div>
      );
    } else {
      return <div className='calendar-loading-no-event'>No events</div>;
    }
  }
}

export default EventCalendar;
