import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import GroupReducer from './group_reducer';
import ModalReducer from './modal_reducer';
import EventReducer from './event_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  groups: GroupReducer,
  modal: ModalReducer,
  events: EventReducer
});

export default RootReducer;
