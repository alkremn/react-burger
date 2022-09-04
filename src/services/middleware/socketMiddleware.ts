import type { Middleware, MiddlewareAPI } from 'redux';
import {
  getWsConnectionSuccessAction,
  getWsConnectionClosedAction,
  getWsConnectionErrorAction,
  getFinishLoadingAction,
} from '../actionCreators';
import { WS_CONNECTION_STOP, WS_CONNECTION_START, WS_SECURE_CONNECTION_START } from '../constants';
import { AppDispatch, RootState, TApplicationActions } from '../types';
import { getWsGetOrderDataAction } from '../actionCreators/wsActions';
import { TAuthState } from '../reducers/authReducer';

export const socketMiddleware = (wsUrl: string): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TApplicationActions) => {
      const { dispatch, getState } = store;
      const { type } = action;
      const { user }: TAuthState = getState().auth;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(`${wsUrl}/all`);
        dispatch(getFinishLoadingAction());
      } else if (type === WS_SECURE_CONNECTION_START) {
        socket = new WebSocket(`${wsUrl}?token=${user?.accessToken}`);
      } else if (type === WS_CONNECTION_STOP) {
        socket?.close();
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(getWsConnectionSuccessAction());
        };

        socket.onclose = () => {
          dispatch(getWsConnectionClosedAction());
          dispatch(getFinishLoadingAction());
        };

        socket.onerror = () => {
          dispatch(getWsConnectionErrorAction());
        };

        socket.onmessage = ({ data }) => {
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          if (success) {
            dispatch(getWsGetOrderDataAction(restParsedData));
          }
          dispatch(getFinishLoadingAction());
        };
      }

      next(action);
    };
  };
};
