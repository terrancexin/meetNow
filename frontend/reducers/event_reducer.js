import { RECEIVE_ALL_EVENTS,
         RECEIVE_EVENT,
         RECEIVE_SINGLE_GROUP_EVENTS,
         REMOVE_EVENT } from '../actions/event_actions';
import { merge } from 'lodash';
const EventReducer = (state = {}, action) => {
  let newState;

  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_EVENTS:
      return action.events;

    case RECEIVE_EVENT:
      return Object.assign({}, state, {[action.event.id]: action.event});

    case RECEIVE_SINGLE_GROUP_EVENTS:
      newState = action.group.events ? action.group.events : {};
      return newState;

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
