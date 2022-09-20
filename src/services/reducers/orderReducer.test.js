import { orderReducer } from './orderReducer';
import { POST_ORDER_SUCCESS, POST_ORDER_FAIL } from '../constants/orderConstants';

describe('order reducer', () => {
  const order = {
    ingredients: [
      '60d3b41abdacab0026a733c6',
      '60d3b41abdacab0026a733ca',
      '60d3b41abdacab0026a733ce',
      '60d3b41abdacab0026a733d1',
      '60d3b41abdacab0026a733ce',
    ],
    _id: '2234235',
    status: 'done',
    number: 0,
    createdAt: '2021-06-23T14:43:22.587Z',
    updatedAt: '2021-06-23T14:43:22.603Z',
  };

  it('should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual({
      order: null,
      error: null,
    });
  });

  it('should handle POST_ORDER_SUCCESS', () => {
    expect(
      orderReducer(undefined, {
        type: POST_ORDER_SUCCESS,
        payload: order,
      })
    ).toEqual({
      order,
      error: null,
    });
  });

  it('should handle POST_ORDER_FAIL', () => {
    expect(
      orderReducer(undefined, {
        type: POST_ORDER_FAIL,
        payload: 'error message',
      })
    ).toEqual({
      order: null,
      error: 'error message',
    });
  });
});
