import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  UPDATE_TOKEN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from './../constants/authConstants';

const initialState = {
  user: null,
  accessToken: null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, ...action.payload, error: null };
    case REGISTER_FAIL:
      return { ...initialState, error: action.payload };
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload, error: null };
    case UPDATE_TOKEN:
      return { ...state, accessToken: action.payload, error: null };
    case LOGIN_FAIL:
      return { ...initialState, error: action.payload };
    case UPDATE_USER_SUCCESS:
      return { ...initialState, user: action.payload, error: null };
    case UPDATE_USER_FAIL:
      return { ...initialState, user: null, error: action.payload };
    default:
      return state;
  }
};
