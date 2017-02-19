import * as GroupApiUtil from '../util/group_api_util';
import { hashHistory } from 'react-router';

export const RECEIVE_ALL_GROUPS = "RECEIVE_ALL_GROUPS";
export const RECEIVE_ONE_GROUP = "RECEIVE_ONE_GROUP";
export const RECEIVE_GROUP_ERRORS = "RECEIVE_GROUP_ERRORS";

const receiveAllGroups = groups => ({
  type: RECEIVE_ALL_GROUPS,
  groups
});

const receiveOneGroup = group => ({
  type: RECEIVE_ONE_GROUP,
  group
});

const receiveGroupErrors = errors => ({
  type: RECEIVE_GROUP_ERRORS,
  errors
});

const removeGroup = group => ({
  type: REMOVE_GROUP,
  group
});

export const fetchAllGroups = () => dispatch => (
  GroupApiUtil.fetchAllGroups()
    .then(groups =>{
      dispatch(receiveAllGroups(groups));
    },
    error => dispatch(receiveGroupErrors(error.responseJSONs)))
);


export const createGroup = group => dispatch => {
  return(
    GroupApiUtil.createGroup(group)
    .then(group => dispatch(receiveOneGroup(group)),
    error => dispatch(receiveGroupErrors(error.responseJSON)))
  );
};

export const fetchSingleGroup = id => dispatch => {
  return (
    GroupApiUtil.fetchSingleGroup(id)
      .then(group => {
        // debugger
        dispatch(receiveOneGroup(group));
      },
      error => dispatch(receiveGroupErrors(error.responseJSON)))
  );

};
//
// export const updateGroup = group => dispatch => (
//   GroupApiUtil.updateGroup(group).then(group => dispatch(receiveOneGroup(group)))
//     .then(hashHistory.push('/'))
// );

// export const deleteGroup = (group) => dispatch => (
//   GroupApiUtil.deleteGroup(group).then(group => dispatch(removeGroup(group)))
// );

// export const getAllGroups = function() {
//   return function(dispatch) {
//     GroupApiUtil.getAllGroups()
//       .then(groups =>{
//         dispatch(receiveAllGroups(groups));
//       },
//       error => dispatch(receiveGroupErrors(error.responseJSONs)));
//   };
// };
