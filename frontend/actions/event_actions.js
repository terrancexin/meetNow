import * as EventApiUtil from '../util/event_api_util';

export const RECEIVE_ALL_EVENTS = "RECEIVE_ALL_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const REMOVE_EVENT = "REMOVE_EVENT";


export const attendEvent = (eventId) => dispatch => {
  return(
    EventApiUtil.attendEvent(eventId)
      .then(event => dispatch(receiveEvent(event)))
  );
};

export const leaveEvent = (eventId) => dispatch => {
  return(
    EventApiUtil.leaveEvent(eventId)
      .then(event => dispatch(receiveEvent(event)))
  );
};


const receiveAllEvents = events => ({
  type: RECEIVE_ALL_EVENTS,
  events
});

const receiveEvent = event => ({
  type: RECEIVE_EVENT,
  event
});

const removeEvent = event => ({
  type: REMOVE_EVENT,
  event
});

export const fetchAllEvents = () => dispatch => {
  return (EventApiUtil.fetchAllEvents().then(events => dispatch(receiveAllEvents(events))));
};

export const createEvent = event => dispatch => {
  return (EventApiUtil.createEvent().then(event => dispatch(receiveEvent(event))));
};

export const fetchEvent = id => dispatch => {
  return (EventApiUtil.fetchEvent(id).then(event => dispatch(receiveEvent(event))));
};
