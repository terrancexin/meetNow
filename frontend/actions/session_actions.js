import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const login = user => dispatch => (
  SessionApiUtil.login(user).then(user => dispatch(receiveCurrentUser(user)),
  window.logError = (err) => console.log(err.responseText)
));

export const logout = () => dispatch => (
  SessionApiUtil.logout().then(user => dispatch(receiveCurrentUser(null)))
);

export const signup = user => dispatch => (
  SessionApiUtil.signup(user).then(user => dispatch(receiveCurrentUser(user)),
  window.logError = (err) => console.log(err.responseText)
));
