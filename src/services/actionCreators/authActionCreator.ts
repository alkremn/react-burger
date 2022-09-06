import {
  IGetLoginFailAction,
  IGetLoginSuccessAction,
  IGetLogoutFailAction,
  IGetLogoutSuccessAction,
  IGetUpdateTokenAction,
  IGetUpdateUserSuccessAction,
} from '../types/authTypes';
import { IUser } from '../../utils/types';
import {
  IGetRegisterSuccessAction,
  IGetUpdateUserFailAction,
  IGetRegisterFailAction,
} from './../types/authTypes';
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

export function getLoginSuccessAction(user: IUser): IGetLoginSuccessAction {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
}

export function getLoginFailAction(error: string): IGetLoginFailAction {
  return { type: LOGIN_FAIL, payload: error };
}

export function getRegisterSuccessAction(user: IUser): IGetRegisterSuccessAction {
  return {
    type: REGISTER_SUCCESS,
    payload: user,
  };
}

export function getUpdateTokenAction(token: string): IGetUpdateTokenAction {
  return { type: UPDATE_TOKEN, payload: token };
}

export function getRegisterFailAction(error: string): IGetRegisterFailAction {
  return { type: REGISTER_FAIL, payload: error };
}

export function getLogoutSuccessAction(message: string): IGetLogoutSuccessAction {
  return { type: LOGOUT_SUCCESS, payload: message };
}

export function getLogoutFailAction(error: string): IGetLogoutFailAction {
  return { type: LOGOUT_FAIL, payload: error };
}

export function getUpdateUserSuccessAction(user: IUser): IGetUpdateUserSuccessAction {
  return { type: UPDATE_USER_SUCCESS, payload: user };
}

export function getUpdateUserFailAction(error: string): IGetUpdateUserFailAction {
  return { type: UPDATE_USER_FAIL, payload: error };
}
