import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';
import { TAsyncActions } from './asyncTypes';
import { TAuthActions } from './authTypes';
import { TIngredientsActions } from './ingredientsTypes';
import { TOrderActions } from './orderTypes';
import { TWsActions } from './wsTypes';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_ORDER_DATA,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_STOP,
} from '../constants/wsConstants';

export interface WsActions {
  onInit: typeof WS_CONNECTION_START;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onData: typeof WS_GET_ORDER_DATA;
  onStop: typeof WS_CONNECTION_STOP;
}

export type TApplicationActions =
  | TAuthActions
  | TAsyncActions
  | TIngredientsActions
  | TOrderActions
  | TWsActions;

export type AppThunk<TReturn = void> = ThunkAction<TReturn, RootState, never, TApplicationActions>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
