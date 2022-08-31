import { TAsyncState } from './asyncReducer';
import { TAuthState } from './authReducer';
import { TIngredientsState } from './ingredientsReducer';
import { TOrderState } from './orderReducer';
import { TWSState } from './wsReducer';

export type TRootState = TAsyncState & TAuthState & TIngredientsState & TOrderState & TWSState;
