import { TWsActions } from '../types/wsTypes';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_ORDER_DATA,
} from '../constants/wsConstants';
import { IOrderData } from '../../utils/types';

export type TWSState = {
  wsConnected: boolean;
  orderData: IOrderData | null;

  error?: Event;
};

const initialState: TWSState = {
  wsConnected: false,
  orderData: null,
};

export const wsReducer = (state = initialState, action: TWsActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        orderData: null,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_GET_ORDER_DATA:
      return {
        ...state,
        orderData: action.payload,
      };
    default:
      return state;
  }
};
