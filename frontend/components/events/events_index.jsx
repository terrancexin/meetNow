import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchAllEvents } from '../../actions/event_actions';
import { eventsArray } from '../../reducers/event_reducer';

class EventsIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    if (this.props.events) {
      // debugger
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
                <li className='event-location'>{event.location}</li>

                <div>
                  {event.users}
                </div>

                <li className='event-description'>{event.description}</li>
              </ul>

            ))
          }


        </div>
      );
    } else {
      return <div className='loading'>No events</div>;
    }
  }
}

export default EventsIndex;
