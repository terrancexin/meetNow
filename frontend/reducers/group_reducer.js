import { RECEIVE_ALL_GROUPS,
         RECEIVE_ONE_GROUP,
         RECEIVE_GROUP_ERRORS,
         REMOVE_GROUP
       } from '../actions/group_actions';
import { merge } from 'lodash';

const _nullGroup = {};

const GroupReducer = (state = _nullGroup, action ) => {
  let newState;

  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_GROUPS:
      return action.groups;

    case RECEIVE_ONE_GROUP:
      newState = merge({}, state, {[action.group.id]: action.group});
      newState[action.group.id].users = action.group.users;
      return newState;

    case RECEIVE_GROUP_ERRORS:
      return merge({}, state, action.errors);

    case REMOVE_GROUP:
      newState = merge({}, state);
      delete newState[action.group.id];
      return newState;

    default:
      return state;
  }
};

export const groupsArray = allGroups => {
  return Object.keys(allGroups).map(id => {
    return allGroups[id];
  });
};


export default GroupReducer;
