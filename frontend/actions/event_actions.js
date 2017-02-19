import * as EventApiUtil from '../util/event_api_util';

export const RECEIVE_ALL_EVENTS = "RECEIVE_ALL_EVENTS";

const receiveAllEvents = events => ({
  type: RECEIVE_ALL_EVENTS,
  events
});

export const fetchAllEvents = () => dispatch => (
  EventApiUtil.fetchAllEvents().then(events => dispatch(receiveAllEvents(events)))
);
