import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import store from '../store';
import { TAsyncActions } from './asyncTypes';
import { TAuthActions } from './authTypes';
import { TIngredientsActions } from './ingredientsTypes';
import { TOrderActions } from './orderTypes';
import { TWsActions } from './wsTypes';

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
  | TAuthActions
  | TAsyncActions
  | TIngredientsActions
  | TOrderActions
  | TWsActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;
