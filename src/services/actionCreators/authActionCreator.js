import { createAuthPayload } from '../../utils/utils';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_TOKEN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from '../constants/authConstants';

export function getLoginSuccessAction(user, token) {
  return {
    type: LOGIN_SUCCESS,
    payload: createAuthPayload(user, token),
  };
}

export function getLoginFailAction() {
  return { type: LOGIN_FAIL };
}

export function getRegisterSuccessAction(user, token) {
  return {
    type: REGISTER_SUCCESS,
    payload: createAuthPayload(user, token),
  };
}

export function getUpdateTokenAction(token) {
  return { type: UPDATE_TOKEN, payload: token };
}

export function getRegisterFailAction(error) {
  return { type: REGISTER_FAIL, payload: error.message };
}

export function getLogoutSuccessAction(response) {
  return { type: LOGOUT_SUCCESS, payload: response.message };
}

export function getLogoutFailAction(response) {
  return { type: LOGOUT_FAIL, payload: response.message };
}

export function getUpdateUserSuccessAction(response) {
  return { type: UPDATE_USER_SUCCESS, payload: response.user };
}

export function getUpdateUserFailAction(error) {
  return { type: UPDATE_USER_FAIL, payload: error.message };
}
