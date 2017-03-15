import { RECEIVE_ALL_GROUPS, RECEIVE_ONE_GROUP } from '../actions/group_actions';
import { START_LOADING } from '../actions/loading_actions';

const LoadingReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_GROUPS:
    case RECEIVE_ONE_GROUP:
      return Object.assign({}, state, { loading: false });
    case START_LOADING:
      return Object.assign({}, state, { loading: true });
    default:
      return state;
  }
};

export default LoadingReducer;
