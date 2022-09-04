import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';
import { socketMiddleware } from '../middleware';
import { TRootState } from '../reducers';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_STOP,
  WS_CONNECTION_ERROR,
  WS_GET_ORDER_DATA,
  WS_CONNECTION_CLOSED,
} from '../constants/wsConstants';
import { WsActions } from '../types';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const initialState: TRootState = {
  auth: {
    user: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo') ?? '')
      : null,
    message: null,
  },
  async: {
    isLoading: false,
  },
  ingredients: {
    detailedIngredient: null,
    ingredients: [],
    error: null,
    selectedBun: null,
    selectedIngredients: [],
  },
  order: {
    order: null,
    error: null,
  },
  ws: {
    orderData: null,
    wsConnected: false,
    errorMessage: null,
  },
};

// const wsUrl: string = 'wss://norma.nomoreparties.space/orders';

const wsActions: WsActions = {
  onInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onData: WS_GET_ORDER_DATA,
  onStop: WS_CONNECTION_STOP,
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));
const store = createStore(rootReducer, initialState, enhancer);
export type RootState = ReturnType<typeof store.getState>;

export default store;
