import { SET_LOGIN } from "./AuthType";

const initialState = {
  login: {
    loading: false,
    error: null,
    data: null,
  },
};

function AuthReducer(state = initialState, action) {
  if (action.type === SET_LOGIN) {
    return { ...state, login: action.payload };
  }
  return state;
}

export default AuthReducer;
