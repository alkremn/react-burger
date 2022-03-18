import { LOADING_START, LOADING_FINISH } from '../constants/asyncConstants';

const initialState = {
  isLoading: false,
};

export const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true };
    case LOADING_FINISH:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
