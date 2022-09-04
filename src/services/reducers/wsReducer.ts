import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_ORDER_DATA,
  WS_CONNECTION_STOP,
} from '../constants/wsConstants';
import { TWsActions } from '../types/wsTypes';
import { IOrderData } from '../../utils/types';

export type TWSState = {
  wsConnected: boolean;
  orderData: IOrderData | null;
  errorMessage: string | null;
};

const initialState: TWSState = {
  wsConnected: false,
  orderData: null,
  errorMessage: null,
};

export const wsReducer = (state = initialState, action: TWsActions): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        orderData: null,
        wsConnected: true,
        errorMessage: null,
      };
    case WS_CONNECTION_STOP:
      return {
        ...state,
        wsConnected: false,
        orderData: null,
        errorMessage: null,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        orderData: null,
        errorMessage: null,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        errorMessage: action.payload,
      };
    case WS_GET_ORDER_DATA:
      return {
        ...state,
        orderData: action.payload,
        errorMessage: null,
      };
    default:
      return state;
  }
};
