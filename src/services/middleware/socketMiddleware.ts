import type { Middleware, MiddlewareAPI } from 'redux';
import {
  getWsConnectionSuccessAction,
  getWsConnectionClosedAction,
  getWsConnectionErrorAction,
} from '../actionCreators';
import { WS_CONNECTION_STOP, WS_CONNECTION_START } from '../constants';
import { AppDispatch, RootState, TApplicationActions } from '../types';
import { TWsActions } from '../types/wsTypes';
import { getWsGetOrderDataAction } from '../actionCreators/wsActions';

export const socketMiddleware = (wsUrl: string, wsActions?: TWsActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TApplicationActions) => {
      const { dispatch, getState } = store;
      const { type } = action;
      const { user } = getState().auth;

      if (type === WS_CONNECTION_START) {
        if (user) {
          socket = new WebSocket(wsUrl);
        } else {
        }
      }

      if (type === WS_CONNECTION_STOP && user) {
        socket?.close();
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(getWsConnectionSuccessAction());
        };

        socket.onclose = () => {
          dispatch(getWsConnectionClosedAction());
        };

        socket.onerror = () => {
          dispatch(getWsConnectionErrorAction());
        };

        socket.onmessage = ({ data }) => {
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch(getWsGetOrderDataAction(restParsedData));
        };
      }

      next(action);
    };
  };
};
