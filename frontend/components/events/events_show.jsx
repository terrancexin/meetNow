import React from 'react';

class EventShow extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.event.name}
        </ul>
      </div>
    );
  }
}

export default EventShow;
