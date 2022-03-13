import { ADD_SELECTED_BUN, REMOVE_SELECTED_BUN } from '../utils/constants';

export const selectedBunInitialState = {
  selectedBun: null,
};

export const selectedBunReducer = (state, action) => {
  switch (action.type) {
    case ADD_SELECTED_BUN:
      return { selectedBun: action.payload };
    case REMOVE_SELECTED_BUN:
      return selectedBunInitialState;
    default:
      throw new Error(`Invalid action type${action.type}`);
  }
};
