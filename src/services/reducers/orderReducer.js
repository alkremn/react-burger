import { ADD_ORDER, REMOVE_ORDER } from '../constants/orderConstants';

const initialState = {
  order: {},
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return { ...state, order: action.payload };
    default:
      return state;
  }
};
