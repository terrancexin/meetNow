import { RECEIVE_ALL_GROUPS,
         RECEIVE_ONE_GROUP,
         RECEIVE_GROUP_ERRORS
       } from '../actions/group_actions';
import { merge } from 'lodash';

const _nullGroup = {};

const GroupReducer = (state = _nullGroup, action ) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_GROUPS:
      return merge({}, state, action.groups);
    case RECEIVE_ONE_GROUP:
      return merge({}, state, {[action.group.id]: action.group});
    case RECEIVE_GROUP_ERRORS:
      return merge({}, state, action.errors);

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
