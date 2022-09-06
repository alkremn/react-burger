import { LOADING_START, LOADING_FINISH } from '../constants/asyncConstants';
import { TAsyncActions } from '../types/asyncTypes';

export interface TAsyncState {
  isLoading: boolean;
}

const initialState: TAsyncState = {
  isLoading: false,
};

export const asyncReducer = (state = initialState, action: TAsyncActions): TAsyncState => {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true };
    case LOADING_FINISH:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
