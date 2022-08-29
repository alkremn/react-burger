import type { Middleware, MiddlewareAPI } from 'redux';
import { WS_CONNECTION_START } from '../constants/wsConstants';
import { AppDispatch, RootState, TApplicationActions } from '../types';

export const socketMiddleware = (wsUrl: string): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TApplicationActions) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(wsUrl);
      }
    };
  };
};
