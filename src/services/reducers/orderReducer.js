import {
  POST_ORDER_SUCCESS,
  POST_ORDER_FAIL,
} from '../constants/orderConstants';

const initialState = {
  order: {
    name: null,
    number: null,
  },
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER_SUCCESS:
      return { ...state, error: null, order: action.payload };
    case POST_ORDER_FAIL:
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};
