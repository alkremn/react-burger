import {
  POST_ORDER_SUCCESS,
  POST_ORDER_FAIL,
} from './../constants/orderConstants';

export function getPostOrderSuccessAction(response) {
  return {
    type: POST_ORDER_SUCCESS,
    payload: { name: response.name, number: response.order.number },
  };
}

export function getPostOrderFailAction(error) {
  return { type: POST_ORDER_FAIL, payload: error.message };
}
