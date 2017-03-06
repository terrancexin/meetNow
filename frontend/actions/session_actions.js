import * as SessionApiUtil from '../util/session_api_util';
import { receiveNotices, clearNotices } from './notice_actions';
import { RECEIVE_ERRORS, CLEAR_ERRORS } from './error_actions';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

const loginMessage = currentUser => (`Hi ${currentUser.first_name}, let's meetNow!`);
const logoutMessage = currentUser => (`Come back soon, ${currentUser.first_name}!`);
const signupMessage = currentUser => (`You signed up! Hi ${currentUser.first_name}, let's meetNow!`);

export const signup = user => dispatch => {
  return SessionApiUtil.signup(user).then(currentUser => {
    dispatch(receiveCurrentUser(currentUser));
    dispatch(clearSessionErrors());
    dispatch(receiveNotices(signupMessage(currentUser)));
    return currentUser;
  }, error => dispatch(receiveSessionErrors(error.responseJSON)));
};

export const login = user => dispatch => {
  return SessionApiUtil.login(user).then(currentUser => {
    dispatch(receiveCurrentUser(currentUser));
    dispatch(clearSessionErrors());
    dispatch(receiveNotices([loginMessage(currentUser)]));
    return currentUser;
  }, error => dispatch(receiveSessionErrors(error.responseJSON)));
};

export const logout = () => dispatch => {
  return SessionApiUtil.logout().then(currentUser => {
    dispatch(receiveCurrentUser(null));
    dispatch(receiveNotices(logoutMessage(currentUser)));
    dispatch(clearSessionErrors());
    return null;
  }, error => dispatch(receiveSessionErrors(error.responseJSON)));
};

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveSessionErrors = errors => {
  return {
    type: RECEIVE_ERRORS,
    key: "session",
    errors
  };
};

export const clearSessionErrors = () => ({
  type: CLEAR_ERRORS,
  key: "session"
});
