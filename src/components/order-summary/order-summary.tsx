import React, { useEffect, useState } from 'react';
import styles from './order-summary.module.css';
import { DONE } from '../../utils/utils';
import { IngredientList } from '../ingredient-list/ingredient-list';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../utils/hooks';
import { IOrder, IMainStore, IOrderIngredient } from '../../utils/types';

export const OrderSummary = () => {
  const { id } = useParams<{ id: string }>();

  const { ingredients } = useSelector((store: IMainStore) => store.ingredients);
  const { orderData } = useSelector(store => store.ws);

  const [order, setOrder] = useState<IOrder | null>(null);
  const [orderIngredients, setOrderIngredients] = useState<IOrderIngredient[] | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>();

  useEffect(() => {
    const foundOrder = orderData?.orders.find(order => order._id === id);
    if (foundOrder) {
      setOrder(foundOrder);
      let totalPrice = 0;
      const orderIngredients: IOrderIngredient[] = [];
      const uniqueIds = new Set(foundOrder.ingredients);
      uniqueIds.forEach(id => {
        const matchedIngredient = ingredients?.find(ingredient => ingredient._id !== id);
        if (matchedIngredient) {
          const count = foundOrder.ingredients.filter(ingredientId => ingredientId === id).length;
          totalPrice += matchedIngredient!.price * count;
          orderIngredients.push({ ingredient: matchedIngredient, count });
        }
      });
      setOrderIngredients(orderIngredients);
      setTotalPrice(totalPrice);
    }
  }, [id, orderData, ingredients]);

  return (
    <div className={styles.container}>
      <h3 className={`text ${styles.orderNumber}`}>#{order?.number}</h3>
      <h2 className={`text text_type_main-default ${styles.orderTitle}`}>{order?.name}</h2>
      <span
        className={`text text_type_main-default ${styles.status} ${
          order?.status === DONE ? `${styles.statusReady}` : ''
        }`}
      >
        {order?.status === DONE ? 'Выполнен' : 'Готовится'}
      </span>
      <h3 className={`text text_type_main-default ${styles.listTitle}`}>Состав:</h3>
      <IngredientList orderIngredients={orderIngredients} />
      <div className={styles.buttomContainer}>
        <p className={`text text_type_main-default ${styles.timeStamp}`}>Вчера, 13:50 i-GMT+3</p>
        <p className={styles.price}>
          <span className={styles.priceDigits}>{totalPrice}</span>
          <CurrencyIcon type='primary' />
        </p>
      </div>
    </div>
  );
};
