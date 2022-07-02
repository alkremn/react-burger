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
  getARemoveDetailedIngredientAction,
} from '../actionCreators/ingredientsActionCreators';
import {
  getFinishLoadingAction,
  getStartLoadingAction,
} from './../actionCreators/asyncActionCreator';

export const fetchIngredientsAction = () => async dispatch => {
  dispatch(getStartLoadingAction());

  fetch(`${baseURL}/ingredients`)
    .then(res => checkResponse(res))
    .then(dataJson => {
      dispatch(getFetchIngredientsSuccessAction(dataJson));
    })
    .catch(error => {
      dispatch(getFetchIngredientsFailAction(error));
    })
    .finally(() => dispatch(getFinishLoadingAction()));
};

export const addSelectedIngredientsAction = ingredients => dispatch => {
  dispatch(getAddSelectedIngredientsAction(ingredients));
};

export const addSelectedIngredientAction = (selectedBun, ingredient) => dispatch => {
  if (ingredient.type === 'bun') {
    if (selectedBun) {
      dispatch(getDecrementIngredientCountAction(selectedBun));
    }
    dispatch(getAddSelectedBunAction(ingredient));
  } else {
    const updatedIngredient = {
      ...ingredient,
      uniqueId: Date.now(),
    };
    dispatch(getAddSelectedIngredientAction(updatedIngredient));
  }

  dispatch(getIncrementIngredientCountAction(ingredient));
};

export const removeSelectedIngredientsAction = selectedBun => dispatch => {
  dispatch(getRemoveSelectedIngredientsAction());
  dispatch(getDecrementIngredientCountAction(selectedBun));
  dispatch(getRemoveSelectedBunAction());
};

export const removeSelectedIngredientAction = ingredient => dispatch => {
  dispatch(getRemoveSelectedIngredientAction(ingredient));
  dispatch(getDecrementIngredientCountAction(ingredient));
};
export const addDetailedIngredient = ingredient => dispatch => {
  dispatch(getAddDetailedIngredientAction(ingredient));
};

export const removeDetailedIngredient = () => dispatch => {
  dispatch(getARemoveDetailedIngredientAction());
};
