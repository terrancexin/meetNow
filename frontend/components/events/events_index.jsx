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
      const eventArray = Object.keys(this.props.events).map(id => this.props.events[id]);
      return (
        <div>
            {
              eventArray.map(event => (
                <ul key={event.id}>
                  <div>{event.name}</div>
                <li>{event.description}</li>
                <li>{event.time}</li>
                <li>{event.location}</li>
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
