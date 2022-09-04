import { combineReducers } from 'redux';

import { asyncReducer } from './asyncReducer';
import { ingredientsReducer } from './ingredientsReducer';
import { orderReducer } from './orderReducer';
import { authReducer } from './authReducer';
import { wsReducer } from './wsReducer';
import { TRootState } from './index';

export const rootReducer = combineReducers<TRootState>({
  async: asyncReducer,
  auth: authReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  ws: wsReducer,
});
