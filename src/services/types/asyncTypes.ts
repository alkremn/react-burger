import { LOADING_FINISH, LOADING_START } from '../constants/asyncConstants';

export interface IGetStartLoadingAction {
  readonly type: typeof LOADING_START;
}

export interface IGetFinishLoadingAction {
  readonly type: typeof LOADING_FINISH;
}

export type TAsyncActions = IGetStartLoadingAction | IGetFinishLoadingAction;
