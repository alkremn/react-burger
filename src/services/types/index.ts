import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import store from '../store';
import { TAsyncActions } from './asyncTypes';
import { TAuthActions } from './authTypes';
import { TIngredientsActions } from './ingredientsTypes';
import { TOrderActions } from './orderTypes';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions = TAuthActions | TAsyncActions | TIngredientsActions | TOrderActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;
