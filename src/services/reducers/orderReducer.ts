import { POST_ORDER_SUCCESS, POST_ORDER_FAIL } from '../constants/orderConstants';
import { TOrderActions } from '../types/orderTypes';

export interface TOrderState {
  order: { name: string; number: string } | null;
  error: string | null;
}

const initialState: TOrderState = {
  order: null,
  error: null,
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case POST_ORDER_SUCCESS:
      return { ...state, error: null, order: action.payload };
    case POST_ORDER_FAIL:
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};
