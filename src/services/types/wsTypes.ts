import { IOrderData } from '../../utils/types';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
  WS_GET_ORDER_DATA,
  WS_CONNECTION_STOP,
} from '../constants';

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}

export interface IWsConnectionStopAction {
  readonly type: typeof WS_CONNECTION_STOP;
}

export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly payload: Event | null;
}

export interface IWsGetOrderDataAction {
  readonly type: typeof WS_GET_ORDER_DATA;
  readonly payload: IOrderData | null;
}

export type TWsActions =
  | IWsConnectionStartAction
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionStopAction
  | IWsConnectionClosedAction
  | IWsGetOrderDataAction;
