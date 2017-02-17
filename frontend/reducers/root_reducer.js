import {combineReducers} from 'redux';
import SessionReducer from './session_reducer';
import GroupReducer from './group_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  groups: GroupReducer



});

export default RootReducer;
