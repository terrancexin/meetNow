import { OPEN_SIGNUP,
         CLOSE_SIGNUP,
         OPEN_CREATE_GROUP,
         CLOSE_CREATE_GROUP,
         OPEN_AUTHFORM,
         CLOSE_AUTHFORM } from '../actions/modal_actions';

const initialState = {
  signUpForm: false,
  groupForm: false,
  authForm: false
};

const ModalReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case OPEN_SIGNUP:
      return Object.assign({}, {signUpForm: action.open});
    case CLOSE_SIGNUP:
      return Object.assign({}, {signUpForm: action.close});
    case OPEN_CREATE_GROUP:
      return Object.assign({}, {groupForm: action.open});
    case CLOSE_CREATE_GROUP:
      return Object.assign({}, {groupForm: action.close});

    case OPEN_AUTHFORM:
      return Object.assign({}, {authForm: action.open});
    case CLOSE_AUTHFORM:
      return Object.assign({}, {authForm: action.close});

    default:
    return state;
  }
};

export default ModalReducer;
