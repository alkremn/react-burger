import { IOrderData } from '../../utils/types';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_STOP,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDER_DATA,
  WS_SECURE_CONNECTION_START,
} from '../constants';

export const getWsConnectionStartAction = () => {
  return {
    type: WS_CONNECTION_START,
  };
};

export const getWsSecureConnectionStartAction = () => {
  return {
    type: WS_SECURE_CONNECTION_START,
  };
};

export function getWsConnectionSuccessAction() {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
}

export function getWsConnectionErrorAction() {
  return {
    type: WS_CONNECTION_ERROR,
  };
}

export function getWsConnectionStopAction() {
  return {
    type: WS_CONNECTION_STOP,
  };
}

export function getWsConnectionClosedAction() {
  return {
    type: WS_CONNECTION_CLOSED,
  };
}

export function getWsGetOrderDataAction(orderData: IOrderData) {
  return {
    type: WS_GET_ORDER_DATA,
    payload: orderData,
  };
}
