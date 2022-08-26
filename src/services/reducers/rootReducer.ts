import { combineReducers } from 'redux';

import { asyncReducer } from './asyncReducer';
import { ingredientsReducer } from './ingredientsReducer';
import { orderReducer } from './orderReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  async: asyncReducer,
  auth: authReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
});
