import type { Middleware, MiddlewareAPI } from 'redux';
import {
  getWsConnectionSuccessAction,
  getWsConnectionClosedAction,
  getWsConnectionErrorAction,
} from '../actionCreators';
import { WS_CONNECTION_START } from '../constants';
import { AppDispatch, RootState, TApplicationActions } from '../types';
import { TWsActions } from '../types/wsTypes';
import { getWsGetOrdersAction } from '../actionCreators/wsActions';

export const socketMiddleware = (wsUrl: string, wsActions?: TWsActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TApplicationActions) => {
      const { dispatch, getState } = store;
      const { type } = action;
      const { user } = getState().auth;

      if (type === WS_CONNECTION_START && user) {
        socket = new WebSocket(wsUrl);
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
          dispatch(getWsGetOrdersAction(restParsedData.orders));
          console.log(restParsedData);
        };
      }

      next(action);
    };
  };
};
