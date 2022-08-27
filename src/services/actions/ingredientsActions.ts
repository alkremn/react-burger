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
import { AppThunk } from '../types';

export const fetchIngredientsAction = () => async (dispatch: AppThunk) => {
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
  (ingredients: IIngredient[]) => (dispatch: AppThunk) => {
    dispatch(getAddSelectedIngredientsAction(ingredients));
  };

export const addSelectedIngredientAction =
  (selectedBun: IIngredient, ingredient: IIngredient) => (dispatch: AppThunk) => {
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
  (selectedBun: IIngredient) => (dispatch: AppThunk) => {
    dispatch(getRemoveSelectedIngredientsAction());
    dispatch(getDecrementIngredientCountAction(selectedBun));
    dispatch(getRemoveSelectedBunAction());
  };

export const removeSelectedIngredientAction = (ingredient: IIngredient) => (dispatch: AppThunk) => {
  dispatch(getRemoveSelectedIngredientAction(ingredient));
  dispatch(getDecrementIngredientCountAction(ingredient));
};
export const addDetailedIngredient = (ingredient: IIngredient) => (dispatch: AppThunk) => {
  dispatch(getAddDetailedIngredientAction(ingredient));
};

export const removeDetailedIngredient = () => (dispatch: AppThunk) => {
  dispatch(getRemoveDetailedIngredientAction());
};
