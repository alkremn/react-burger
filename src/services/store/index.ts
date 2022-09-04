import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';
import { socketMiddleware } from '../middleware';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const initialState: any = {
  auth: {
    user: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo') ?? '')
      : null,
  },
};

const wsUrl: string = 'wss://norma.nomoreparties.space/orders';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl)));

export default createStore(rootReducer, initialState, enhancer);
