import { RECEIVE_ALL_GROUPS, RECEIVE_ONE_GROUP } from '../actions/group_actions';
import { RECEIVE_ALL_EVENTS, RECEIVE_EVENT, RECEIVE_SINGLE_GROUP_EVENTS } from '../actions/event_actions';
import { START_LOADING } from '../actions/loading_actions';
import { RECEIVE_SINGLE_USER } from '../actions/user_actions';

const LoadingReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_EVENTS:
    case RECEIVE_ONE_GROUP:
    case RECEIVE_SINGLE_GROUP_EVENTS:
    case RECEIVE_SINGLE_USER:
    case RECEIVE_EVENT:
      return Object.assign({}, state, { loading: false });
    case START_LOADING:
      return Object.assign({}, state, { loading: true });
    default:
      return state;
  }
};

export default LoadingReducer;
