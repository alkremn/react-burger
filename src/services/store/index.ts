import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { IUser } from '../../utils/types';
import { rootReducer } from '../reducers/rootReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type TInitialState = {
  auth: {
    user: IUser | null;
  };
};

const initialState: any = {
  auth: {
    user: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo') ?? '')
      : null,
  },
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export default createStore(rootReducer, initialState, enhancer);
