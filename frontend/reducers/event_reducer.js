import { RECEIVE_ALL_EVENTS, RECEIVE_EVENT } from '../actions/event_actions';

const EventReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_EVENTS:
      return Object.assign({}, state, action.events);
    case RECEIVE_EVENT:
      return Object.assign({}, state, {[action.event.id]: action.event});

    default:
      return state;
  }
};

export const eventsArray = allEvents => {
  return Object.keys(allEvents).map(id => {
    return allEvents[id];
  });
};

export default EventReducer;
