import { IGetPostOrderSuccessAction } from './../types/orderTypes';
import { POST_ORDER_SUCCESS, POST_ORDER_FAIL } from '../constants/orderConstants';

export function getPostOrderSuccessAction(response: {
  name: string;
  order: { number: string };
}): IGetPostOrderSuccessAction {
  return {
    type: POST_ORDER_SUCCESS,
    order: { name: response.name, number: response.order.number },
  };
}

export function getPostOrderFailAction(error: { message: string }) {
  return { type: POST_ORDER_FAIL, payload: error.message };
}
