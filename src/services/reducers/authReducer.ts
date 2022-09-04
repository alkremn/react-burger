import { TAuthActions } from '../types/authTypes';
import { IUser } from '../../utils/types';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  UPDATE_TOKEN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from '../constants/authConstants';

export interface TAuthState {
  user: IUser | null;
  message: string | null;
}

const initialState: TAuthState = {
  user: null,
  message: null,
};

export const authReducer = (state: TAuthState = initialState, action: TAuthActions): TAuthState => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, user: action.payload, message: null };
    case REGISTER_FAIL:
      return { ...initialState, user: null, message: action.payload };
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, message: null };
    case LOGIN_FAIL:
      return { ...initialState, user: null, message: action.payload };
    case LOGOUT_SUCCESS:
      return { ...initialState, user: null, message: action.payload };
    case LOGOUT_FAIL:
      return { ...initialState, user: null, message: action.payload };
    case UPDATE_USER_SUCCESS:
      return { ...initialState, user: action.payload, message: null };
    case UPDATE_USER_FAIL:
      return { ...initialState, user: null, message: action.payload };
    case UPDATE_TOKEN:
      return { ...state, user: { ...state.user, accessToken: action.payload }, message: null };
    default:
      return state;
  }
};
