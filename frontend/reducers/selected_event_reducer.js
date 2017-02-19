import { RECEIVE_ALL_EVENTS } from '../actions/event_actions';
import { merge } from 'lodash';

const SelectedEventReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_EVENTS:
      return action.events;
    default:
      return state;
  }
};
