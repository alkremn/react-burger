import { IOrder } from '../../utils/types';
import { POST_ORDER_SUCCESS, POST_ORDER_FAIL } from '../constants/orderConstants';
import { TOrderActions } from '../types/orderTypes';

export type TOrderState = {
  order: IOrder | null;
  error: string | null;
};

const initialState: TOrderState = {
  order: null,
  error: null,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case POST_ORDER_SUCCESS:
      return { ...state, error: null, order: action.order };
    case POST_ORDER_FAIL:
      return { ...initialState, error: action.error };
    default:
      return state;
  }
};
