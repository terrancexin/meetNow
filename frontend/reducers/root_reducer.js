import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import GroupReducer from './group_reducer';
import ModalReducer from './modal_reducer';
import EventReducer from './event_reducer';
import UserDetailReducer from './user_detail_reducer';
import ErrorsReducer from './errors_reducer';
import NoticesReducer from './notices_reducer';
import LoadingReducer from './loading_reducer';


const RootReducer = combineReducers({
  session: SessionReducer,
  groups: GroupReducer,
  modal: ModalReducer,
  events: EventReducer,
  userDetail: UserDetailReducer,
  notices: NoticesReducer,
  errors: ErrorsReducer,
  loading: LoadingReducer
});

export default RootReducer;
