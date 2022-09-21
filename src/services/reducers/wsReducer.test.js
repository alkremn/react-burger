import { wsReducer, initialState } from './wsReducer';
import * as types from '../constants/wsConstants';

describe('ws reducer', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(
      wsReducer(undefined, {
        type: types.WS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      wsConnected: true,
    });
  });

  it('should handle WS_CONNECTION_STOP', () => {
    expect(
      wsReducer(undefined, {
        type: types.WS_CONNECTION_STOP,
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(
      wsReducer(undefined, {
        type: types.WS_CONNECTION_CLOSED,
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(
      wsReducer(undefined, {
        type: types.WS_CONNECTION_ERROR,
        payload: 'error message',
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
      errorMessage: 'error message',
    });
  });

  it('should handle WS_GET_ORDER_DATA', () => {
    expect(
      wsReducer(undefined, {
        type: types.WS_GET_ORDER_DATA,
        payload: [],
      })
    ).toEqual({
      ...initialState,
      orderData: [],
    });
  });
});
