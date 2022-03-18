import { combineReducers } from 'redux';

import { asyncReducer } from '../reducers/asyncReducer';
import { ingredientsReducer } from '../reducers/ingredientsReducer';
import { orderReducer } from '../reducers/orderReducer';

export const rootReducer = combineReducers({
  async: asyncReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
});
