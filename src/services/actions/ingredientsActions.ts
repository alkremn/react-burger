import { baseURL, checkResponse } from '../../utils/utils';
import {
  getAddSelectedBunAction,
  getAddSelectedIngredientAction,
  getAddSelectedIngredientsAction,
  getDecrementIngredientCountAction,
  getFetchIngredientsFailAction,
  getFetchIngredientsSuccessAction,
  getIncrementIngredientCountAction,
  getRemoveSelectedIngredientAction,
  getRemoveSelectedIngredientsAction,
  getRemoveSelectedBunAction,
  getAddDetailedIngredientAction,
  getRemoveDetailedIngredientAction,
} from '../actionCreators/ingredientsActionCreators';
import {
  getFinishLoadingAction,
  getStartLoadingAction,
} from '../actionCreators/asyncActionCreator';
import { IIngredient } from './../../utils/types';
import { AppDispatch, AppThunk } from '../types';

export const fetchIngredientsAction = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(getStartLoadingAction());
  fetch(`${baseURL}/ingredients`)
    .then(res => checkResponse(res))
    .then(dataJson => {
      dispatch(getFetchIngredientsSuccessAction(dataJson.data));
    })
    .catch(error => {
      dispatch(getFetchIngredientsFailAction(error));
    })
    .finally(() => dispatch(getFinishLoadingAction()));
};

export const addSelectedIngredientsAction =
  (ingredients: IIngredient[]): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(getAddSelectedIngredientsAction(ingredients));
  };

export const addSelectedIngredientAction =
  (selectedBun: IIngredient | null, ingredient: IIngredient): AppThunk =>
  (dispatch: AppDispatch) => {
    if (ingredient.type === 'bun') {
      if (selectedBun) {
        dispatch(getDecrementIngredientCountAction(selectedBun));
      }
      dispatch(getAddSelectedBunAction(ingredient));
    } else {
      const updatedIngredient: IIngredient = {
        ...ingredient,
        uniqueId: Date.now().toString(),
      };
      dispatch(getAddSelectedIngredientAction(updatedIngredient));
    }

    dispatch(getIncrementIngredientCountAction(ingredient));
  };

export const removeSelectedIngredientsAction =
  (selectedBun: IIngredient): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(getRemoveSelectedIngredientsAction());
    dispatch(getDecrementIngredientCountAction(selectedBun));
    dispatch(getRemoveSelectedBunAction());
  };

export const removeSelectedIngredientAction =
  (ingredient: IIngredient): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(getRemoveSelectedIngredientAction(ingredient));
    dispatch(getDecrementIngredientCountAction(ingredient));
  };
export const addDetailedIngredient =
  (ingredient: IIngredient): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(getAddDetailedIngredientAction(ingredient));
  };

export const removeDetailedIngredient = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(getRemoveDetailedIngredientAction());
};
