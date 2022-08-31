import { IOrder } from '../../utils/types';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from '../constants';

export const getWsConnectionStartAction = () => {
  return {
    type: WS_CONNECTION_START,
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

export function getWsConnectionClosedAction() {
  return {
    type: WS_CONNECTION_CLOSED,
  };
}

export function getWsGetOrdersAction(orders: IOrder[]) {
  return {
    type: WS_GET_ORDERS,
    payload: orders,
  };
}
