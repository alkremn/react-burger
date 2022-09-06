import { IUser } from '../../utils/types';
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

export interface IGetLoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: IUser;
}

export interface IGetLoginFailAction {
  readonly type: typeof LOGIN_FAIL;
  readonly payload: string;
}

export interface IGetRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  readonly payload: IUser;
}

export interface IGetRegisterFailAction {
  readonly type: typeof REGISTER_FAIL;
  readonly payload: string;
}

export interface IGetUpdateTokenAction {
  readonly type: typeof UPDATE_TOKEN;
  readonly payload: string;
}

export interface IGetLogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
  readonly payload: string;
}

export interface IGetLogoutFailAction {
  readonly type: typeof LOGOUT_FAIL;
  readonly payload: string;
}

export interface IGetUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: IUser;
}

export interface IGetUpdateUserFailAction {
  readonly type: typeof UPDATE_USER_FAIL;
  readonly payload: string;
}

export type TAuthActions =
  | IGetLoginSuccessAction
  | IGetLoginFailAction
  | IGetRegisterSuccessAction
  | IGetRegisterFailAction
  | IGetUpdateTokenAction
  | IGetLogoutSuccessAction
  | IGetLogoutFailAction
  | IGetUpdateUserSuccessAction
  | IGetUpdateUserFailAction;
