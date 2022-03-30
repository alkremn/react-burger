import { createAuthPayload } from '../../utils/utils';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../constants/authConstants';

export function getLoginSuccessAction(response) {
  return {
    type: LOGIN_SUCCESS,
    payload: createAuthPayload(response),
  };
}

export function getLoginFailAction() {
  return { type: LOGIN_FAIL };
}

export function getRegisterSuccessAction(response) {
  return {
    type: REGISTER_SUCCESS,
    payload: createAuthPayload(response),
  };
}

export function getRegisterFailAction(error) {
  return { type: REGISTER_FAIL, payload: error.message };
}
