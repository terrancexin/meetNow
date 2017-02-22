import * as EventApiUtil from '../util/event_api_util';

export const RECEIVE_ALL_EVENTS = "RECEIVE_ALL_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";

const receiveAllEvents = events => ({
  type: RECEIVE_ALL_EVENTS,
  events
});

const receiveEvent = event => ({
  type: RECEIVE_EVENT,
  event
});

export const fetchAllEvents = () => dispatch => {
  return (EventApiUtil.fetchAllEvents().then(events => dispatch(receiveAllEvents(events))));
};

export const createEvent = event => dispatch => {
  return (EventApiUtil.createEvent().then(event => createEvent(event)));
};
