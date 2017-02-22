import React from 'react';
import EventsIndex from './events_index';

class Events extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <EventsIndex />
      </div>
    );
  }
}

export default Events;
