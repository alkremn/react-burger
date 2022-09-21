import { asyncReducer, initialState } from './asyncReducer';
import { LOADING_START, LOADING_FINISH } from '../constants/asyncConstants';

describe('async reducer', () => {
  it('should return the initial state', () => {
    expect(asyncReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOADING_START', () => {
    expect(
      asyncReducer(undefined, {
        type: LOADING_START,
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle LOADING_FINISH', () => {
    expect(
      asyncReducer(undefined, {
        type: LOADING_FINISH,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
    });
  });
});
