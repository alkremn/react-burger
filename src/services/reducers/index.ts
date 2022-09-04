import { TAsyncState } from './asyncReducer';
import { TAuthState } from './authReducer';
import { TIngredientsState } from './ingredientsReducer';
import { TOrderState } from './orderReducer';
import { TWSState } from './wsReducer';

export interface TRootState {
  async: TAsyncState;
  auth: TAuthState;
  ingredients: TIngredientsState;
  order: TOrderState;
  ws: TWSState;
}
