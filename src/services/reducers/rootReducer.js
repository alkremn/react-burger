import { combineReducers } from 'redux';

import { asyncReducer } from '../reducers/asyncReducer';
import { ingredientsReducer } from '../reducers/ingredientsReducer';
import { orderReducer } from '../reducers/orderReducer';
import { authReducer } from '../reducers/authReducer';

export const rootReducer = combineReducers({
  async: asyncReducer,
  auth: authReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
});
