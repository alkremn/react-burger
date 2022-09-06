import React, { useEffect, useState } from 'react';
import styles from './order-list-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from './../../utils/hooks';
import { TIngredientsState } from '../../services/reducers/ingredientsReducer';
import { Link, useLocation } from 'react-router-dom';
import { timeSince } from '../../utils/utils';

interface IOrderListItemProps {
  orderId: string;
  orderNumber: number;
  title?: string;
  createdAt: string;
  ingredientIds: string[];
}

export const OrderListItem = ({
  orderId,
  orderNumber,
  title,
  createdAt,
  ingredientIds,
}: IOrderListItemProps) => {
  const { ingredients } = useSelector<TIngredientsState>(store => store.ingredients);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const location = useLocation();
  const [totalPrice, setTotalPrice] = useState<number>();

  useEffect(() => {
    const urls: string[] = [];
    let totalPrice = 0;
    ingredientIds.forEach(ingredientId => {
      const foundIngredeint = ingredients.find(ingredient => ingredient._id === ingredientId);
      if (foundIngredeint) {
        urls.push(foundIngredeint?.image);
        totalPrice += foundIngredeint.price;
      }
    });
    setImageUrls(urls);
    setTotalPrice(totalPrice);
  }, [ingredientIds, ingredients]);

  return (
    <li className={styles.container}>
      <Link
        to={{
          pathname: `${
            location.pathname === '/profile/orders' ? location.pathname : '/feed'
          }/${orderId}`,
          state: { background: location },
        }}
        className={styles.linkContainer}
      >
        <div className={styles.topContainer}>
          <p className={styles.orderNumber}>#{orderNumber}</p>
          <p className={`text text_type_main-default ${styles.orderDate}`}>
            {timeSince(createdAt)},{' '}
            {new Date(createdAt).toLocaleTimeString('en-US', {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <h2 className={`text text_type_main-default ${styles.title}`}>{title}</h2>
        <div className={styles.bottomContainer}>
          <ul className={styles.iconsContainer}>
            {imageUrls.map((url, idx) => (
              <li key={idx} className={styles.iconDiv}>
                <img className={styles.iconImage} src={url} alt='icon' />
              </li>
            ))}
          </ul>
          <p className={styles.price}>
            <span className={styles.priceDigits}>{totalPrice}</span>
            <CurrencyIcon type='primary' />
          </p>
        </div>
      </Link>
    </li>
  );
};
