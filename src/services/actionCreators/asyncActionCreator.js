import { LOADING_FINISH, LOADING_START } from './../constants/asyncConstants';

export function getStartLoadingAction() {
  return { type: LOADING_START };
}

export function getFinishLoadingAction() {
  return { type: LOADING_FINISH };
}
