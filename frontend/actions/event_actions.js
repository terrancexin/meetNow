import * as EventApiUtil from '../util/event_api_util';
import * as GroupApiUtil from '../util/group_api_util';
import { startLoading } from './loading_actions';
import { RECEIVE_ERRORS, CLEAR_ERRORS } from './error_actions';

export const RECEIVE_ALL_EVENTS = "RECEIVE_ALL_EVENTS";
export const RECEIVE_SINGLE_GROUP_EVENTS = "RECEIVE_SINGLE_GROUP_EVENTS";
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

const receiveSingleGroupEvents = group => ({
  type: RECEIVE_SINGLE_GROUP_EVENTS,
  group
});

const receiveAllEvents = events => ({
  type: RECEIVE_ALL_EVENTS,
  events
});

export const receiveEvent = event => ({
  type: RECEIVE_EVENT,
  event
});

const removeEvent = event => ({
  type: REMOVE_EVENT,
  event
});

export const receiveEventErrors = errors => ({
  type: RECEIVE_ERRORS,
  key: "event",
  errors
});

export const clearEventErrors = () => ({
  type: CLEAR_ERRORS,
  key: "event"
});

export const fetchSingleGroupEvents = id => dispatch => {
  return (
    GroupApiUtil.fetchSingleGroup(id)
      .then(group => {
        dispatch(receiveSingleGroupEvents(group));
      }, error => dispatch(receiveEventErrors(error.responseJSON)))
  );

};

export const fetchAllEvents = () => dispatch => {
  dispatch(startLoading());
  return (EventApiUtil.fetchAllEvents().then(events => dispatch(receiveAllEvents(events))));
};

export const createEvent = event => dispatch => {
  return(
    EventApiUtil.createEvent(event)
    .then(event => dispatch(receiveEvent(event)),
    error => dispatch(receiveEventErrors(error.responseJSON)))
  );
};

export const fetchEvent = id => dispatch => {
  return (EventApiUtil.fetchEvent(id).then(event => dispatch(receiveEvent(event))));
};
