import { LOADING_FINISH, LOADING_START } from '../constants/asyncConstants';
import { IGetFinishLoadingAction, IGetStartLoadingAction } from './../types/asyncTypes';

export function getStartLoadingAction(): IGetStartLoadingAction {
  return { type: LOADING_START };
}

export function getFinishLoadingAction(): IGetFinishLoadingAction {
  return { type: LOADING_FINISH };
}
