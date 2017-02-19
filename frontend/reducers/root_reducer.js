import {combineReducers} from 'redux';
import SessionReducer from './session_reducer';
import GroupReducer from './group_reducer';
import ModalReducer from './modal_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  groups: GroupReducer,
  modal: ModalReducer



});

export default RootReducer;
