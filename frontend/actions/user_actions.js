import * as UserApiUtil from '../util/user_api_util';
import { startLoading } from './loading_actions';

export const RECEIVE_SINGLE_USER = "RECEIVE_SINGLE_USER";

export const fetchSingleUser = id => dispatch => {
  dispatch(startLoading());
  return UserApiUtil.fetchSingleUser(id).then(user => {
    dispatch(receiveSingleUser(user));
    return user;
  });
};

const receiveSingleUser = user => ({
  type: RECEIVE_SINGLE_USER,
  user
});
