import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from './../constants/authConstants';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
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
    case LOGIN_FAIL:
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};
