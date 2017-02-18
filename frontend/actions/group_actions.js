import * as GroupApiUtil from '../util/group_api_util';

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

export const fetchAllGroups = () => dispatch => (
  GroupApiUtil.fetchAllGroups()
    .then(groups =>{
      dispatch(receiveAllGroups(groups));
    },
    error => dispatch(receiveGroupErrors(error.responseJSONs)))
);


export const createGroup = group => dispatch => (
  GroupApiUtil.createGroup(group)
    .then(group => dispatch(receiveOneGroup(group)),
    error => dispatch(receiveGroupErrors(error.responseJSON)))
);

export const fetchSingleGroup = id => dispatch => {
  return (
    GroupApiUtil.fetchSingleGroup(id)
      .then(group => {
        // debugger
        dispatch(receiveOneGroup(group));
      },
      errors => dispatch(receiveGroupErrors(error.responseJSON)))
  );

};



// export const getAllGroups = function() {
//   return function(dispatch) {
//     GroupApiUtil.getAllGroups()
//       .then(groups =>{
//         dispatch(receiveAllGroups(groups));
//       },
//       error => dispatch(receiveGroupErrors(error.responseJSONs)));
//   };
// };
