import * as MemberApiUtil from '../util/member_api_util';
import { receiveOneGroup } from './group_actions';

export const RECEIVE_MEMBER = "RECEIVE_MEMBER";
export const REMOVE_MEMBER = "REMOVE_MEMBER";

const receiveMember = (groupId, group) => ({
  type: RECEIVE_MEMBER,
  groupId,
  group
});

const removeMember = (userId) => ({
  type: REMOVE_MEMBER,
  userId
});

export const addUserToGroup = (userId, groupId) => dispatch => {
  return(
    MemberApiUtil.addUserToGroup(userId, groupId).then(group => dispatch(receiveOneGroup(group)))
  );
};

export const removeUserFromGroup = userId => dispatch => (
  MemberApiUtil.removeUserFromGroup(userId).then(userId => dispatch(removeMember(userId)))
);
