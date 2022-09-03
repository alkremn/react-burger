import React, { useEffect, useState } from 'react';
import styles from './order-list-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from './../../utils/hooks';
import { TIngredientsState } from '../../services/reducers/ingredientsReducer';
import { Link, useLocation } from 'react-router-dom';

interface IOrderListItemProps {
  orderId: string;
  ingredientIds: string[];
}

export const OrderListItem = ({ orderId, ingredientIds }: IOrderListItemProps) => {
  const { ingredients } = useSelector<TIngredientsState>(store => store.ingredients);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const urls: string[] = [];
    ingredientIds.forEach(ingredientId => {
      const foundIngredeint = ingredients.find(ingredient => ingredient._id === ingredientId);
      if (foundIngredeint) {
        urls.push(foundIngredeint?.image);
      }
    });
    setImageUrls(urls);
  }, [ingredientIds, ingredients]);

  return (
    <li className={styles.container}>
      <Link
        to={{ pathname: `/feed/${orderId}`, state: { background: location } }}
        className={styles.linkContainer}
      >
        <div className={styles.topContainer}>
          <p className={styles.orderNumber}>#03535</p>
          <p className={`text text_type_main-default ${styles.orderDate}`}>
            Сегодня, 16:20 i-GMT+3
          </p>
        </div>
        <h2 className={`text text_type_main-default ${styles.title}`}>
          Death Star Starship Main бургер
        </h2>
        <div className={styles.bottomContainer}>
          <ul className={styles.iconsContainer}>
            {imageUrls.map((url, idx) => (
              <li key={idx} className={styles.iconDiv}>
                <img className={styles.iconImage} src={url} alt='icon' />
              </li>
            ))}
          </ul>
          <p className={styles.price}>
            <span className={styles.priceDigits}>480</span>
            <CurrencyIcon type='primary' />
          </p>
        </div>
      </Link>
    </li>
  );
};
