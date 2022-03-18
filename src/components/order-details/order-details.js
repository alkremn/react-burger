import React, { useEffect } from 'react';
import orderDetailsStyles from './order-details.module.css';

// icons
import checkImage from '../../images/icons/check_mark.svg';

// helpers
import { getIngredientIds } from '../../utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import { postOrder } from './../../services/actions/orderActions';
import { removeSelectedIngredients } from './../../services/actions/ingredientsActions';

export default function OrderDetails() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(store => store.async);
  const { selectedBun, selectedIngredients } = useSelector(
    store => store.ingredients
  );
  const { order } = useSelector(store => store.order);

  useEffect(() => {
    if (selectedBun && selectedIngredients.length > 0) {
      dispatch(postOrder(getIngredientIds(selectedBun, selectedIngredients)));
      dispatch(removeSelectedIngredients());
    }
  }, [dispatch, selectedBun, selectedIngredients]);

  return (
    <div className={orderDetailsStyles.container}>
      {isLoading ? (
        <span
          className={`text text_type_main-large ${orderDetailsStyles.loadingText}`}
        >
          Заказ создается...
        </span>
      ) : (
        <>
          <h2 className={orderDetailsStyles.digits}>{order?.number}</h2>
          <h3
            className={`text text_type_main-default ${orderDetailsStyles.title}`}
          >
            {order?.name}
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
