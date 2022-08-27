import { TAsyncState } from './asyncReducer';
import { TAuthState } from './authReducer';
import { TIngredientsState } from './ingredientsReducer';
import { TOrderState } from './orderReducer';

export type TRootState = TAsyncState & TAuthState & TIngredientsState & TOrderState;
