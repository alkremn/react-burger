import { POST_ORDER_FAIL, POST_ORDER_SUCCESS } from './../constants/orderConstants';

export interface IGetPostOrderSuccessAction {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly order: { name: string; number: string };
}

export interface IGetPostOrderFailAction {
  readonly type: typeof POST_ORDER_FAIL;
  readonly error: string;
}

export type TOrderActions = IGetPostOrderSuccessAction | IGetPostOrderFailAction;
