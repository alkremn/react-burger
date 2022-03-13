import React, { useContext, useEffect, useState } from 'react';
import orderDetailsStyles from './order-details.module.css';

// icons
import checkImage from '../../images/icons/check_mark.svg';

// helpers
import { baseURL, getIngredientIds } from '../../utils/utils';

// context
import { SelectedBunContext } from './../../services/selectedBunContext';
import { SelectedIngredientsContext } from './../../services/selectedIngredientsContext';

export default function OrderDetails() {
  const { selectedBunState } = useContext(SelectedBunContext);
  const { selectedIngredientsState } = useContext(SelectedIngredientsContext);

  const [isLoading, setIsLoading] = useState(false);
  const [orderName, setOrderName] = useState('');
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    if (
      selectedBunState.selectedBun &&
      selectedIngredientsState.selectedIngredients.length > 0
    ) {
      setIsLoading(true);
      const ingredientIds = getIngredientIds(
        selectedBunState.selectedBun,
        selectedIngredientsState.selectedIngredients
      );
      fetch(`${baseURL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: ingredientIds }),
      })
        .then(res => {
          if (!res.ok) {
            return Promise.reject(`Ошибка ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          if (!data.success) {
            return Promise.reject(data.message);
          }
          setOrderName(data.name);
          setOrderNumber(data.order.number);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedBunState, selectedIngredientsState]);

  return (
    <div className={orderDetailsStyles.container}>
      {isLoading ? (
        <span
          className={`text text_type_main-large ${orderDetailsStyles.loadingText}`}
        >
          Saving...
        </span>
      ) : (
        <>
          <h2 className={orderDetailsStyles.digits}>{orderNumber}</h2>
          <h3
            className={`text text_type_main-default ${orderDetailsStyles.title}`}
          >
            {orderName}
          </h3>
          <img
            className={orderDetailsStyles.image}
            src={checkImage}
            alt='check icon'
          ></img>
          <p
            className={`text text_type_main-default ${orderDetailsStyles.topText}`}
          >
            Ваш заказ начали готовить
          </p>
          <p
            className={`text text_type_main-default ${orderDetailsStyles.bottomText}`}
          >
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
}
