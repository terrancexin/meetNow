import * as UserApiUtil from '../util/users_api_util';
import { receiveCurrentUser } from './session_actions';
import { hashHistory } from 'react-router';

export const updateUser = (user) => (dispatch) => {
  return UserApiUtil.updateUser(user)
  .then((res) => dispatch(receiveCurrentUser(res)));
};
