import { asyncReducer } from './asyncReducer';
import { LOADING_START, LOADING_FINISH } from '../constants/asyncConstants';

describe('async reducer', () => {
  it('should return the initial state', () => {
    expect(asyncReducer(undefined, {})).toEqual({
      isLoading: false,
    });
  });

  it('should handle LOADING_START', () => {
    expect(
      asyncReducer(undefined, {
        type: LOADING_START,
      })
    ).toEqual({
      isLoading: true,
    });
  });

  it('should handle LOADING_FINISH', () => {
    expect(
      asyncReducer(undefined, {
        type: LOADING_FINISH,
      })
    ).toEqual({
      isLoading: false,
    });
  });
});
