import * as GroupApiUtil from '../util/group_api_util';
import { startLoading } from './loading_actions';
import { RECEIVE_ERRORS, CLEAR_ERRORS } from './error_actions';

export const RECEIVE_ALL_GROUPS = "RECEIVE_ALL_GROUPS";
export const RECEIVE_ONE_GROUP = "RECEIVE_ONE_GROUP";
export const REMOVE_GROUP = "REMOVE_GROUP";


const receiveAllGroups = groups => ({
  type: RECEIVE_ALL_GROUPS,
  groups
});

export const receiveOneGroup = group => ({
  type: RECEIVE_ONE_GROUP,
  group
});

const receiveGroupErrors = errors => ({
  type: RECEIVE_ERRORS,
  key: "group",
  errors
});

const removeGroup = group => ({
  type: REMOVE_GROUP,
  group
});

export const clearGroupErrors = () => ({
  type: CLEAR_ERRORS,
  key: "group"
});


export const fetchAllGroups = (filter) => dispatch => {
  return (GroupApiUtil.fetchAllGroups(filter).then(groups =>{
      dispatch(receiveAllGroups(groups));
    }, error => dispatch(receiveGroupErrors(error.responseJSONs))));
};


export const createGroup = group => dispatch => {
  return(
    GroupApiUtil.createGroup(group)
    .then(group => dispatch(receiveOneGroup(group)),
    error => dispatch(receiveGroupErrors(error.responseJSON)))
  );
};

export const fetchSingleGroup = id => dispatch => {
  dispatch(startLoading());
  return (
    GroupApiUtil.fetchSingleGroup(id)
      .then(group => {
        dispatch(receiveOneGroup(group));
      }, error => dispatch(receiveGroupErrors(error.responseJSON)))
  );
};

export const deleteGroup = id => dispatch => {
  return (
    GroupApiUtil.deleteGroup(id).then(group => dispatch(removeGroup(group)))
  );
};

export const updateGroup = (group, id) => dispatch => {
  return(
    GroupApiUtil.updateGroup(group, id).then((group, id) => {
      dispatch(receiveOneGroup(group, id));
    }, error => dispatch(receiveGroupErrors(error.responseJSON)))
  );
};
