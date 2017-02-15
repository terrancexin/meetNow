// import {
//   UPDATE_USER,
//   receiveUser,
//   receiveErrors
// } from '../actions/user_actions';
// import { updateUser } from '../util/user_api_util';
// import { hashHistory } from 'react-router';
//
// export const UserMiddleware = ({getState, dispatch}) => next => action => {
//   let receiveCurrentUserSuccess;
//   let failure = errors => dispatch(receiveErrors(errors));
//
//   switch (action.type) {
//     case UPDATE_USER:
//       receiveCurrentUserSuccess = user => {
//         dispatch(receiveUser(user));
//         hashHistory.push('users/:userId');
//       };
//       updateUser(action.user, receiveCurrentUserSuccess, failure);
//       return next(action);
//     default:
//       return next(action);
//   }
// };
//
// export default UserMiddleware;
