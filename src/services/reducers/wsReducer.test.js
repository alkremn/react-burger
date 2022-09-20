import { wsReducer } from './wsReducer';
import * as types from '../constants/wsConstants';

describe('ws reducer', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {})).toEqual({
      wsConnected: false,
      orderData: null,
      errorMessage: null,
    });
  });

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(
      wsReducer(undefined, {
        type: types.WS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      orderData: null,
      wsConnected: true,
      errorMessage: null,
    });
  });

  it('should handle WS_CONNECTION_STOP', () => {
    expect(
      wsReducer(undefined, {
        type: types.WS_CONNECTION_STOP,
      })
    ).toEqual({
      wsConnected: false,
      orderData: null,
      errorMessage: null,
    });
  });

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(
      wsReducer(undefined, {
        type: types.WS_CONNECTION_CLOSED,
      })
    ).toEqual({
      wsConnected: false,
      orderData: null,
      errorMessage: null,
    });
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(
      wsReducer(undefined, {
        type: types.WS_CONNECTION_ERROR,
        payload: "error message"
      })
    ).toEqual({
      wsConnected: false,
      orderData: null,
      errorMessage: "error message"
    });
  });

  it('should handle WS_GET_ORDER_DATA', () => {
    expect(
      wsReducer(undefined, {
        type: types.WS_GET_ORDER_DATA,
        payload: []
      })
    ).toEqual({
      wsConnected: false,
      orderData: [],
      errorMessage: null
    });
  });
});
