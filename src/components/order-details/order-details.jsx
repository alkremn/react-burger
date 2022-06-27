import React, { useEffect } from 'react';
import orderDetailsStyles from './order-details.module.css';

// icons
import checkImage from '../../images/icons/check_mark.svg';

// helpers
import { getIngredientIds } from '../../utils/utils';
import { useSelector, useDispatch } from 'react-redux';

// actions
import { postOrderAction } from './../../services/actions/orderActions';
import { removeSelectedIngredientsAction } from './../../services/actions/ingredientsActions';
import { useHistory } from 'react-router-dom';

export default function OrderDetails() {
  const { user } = useSelector(store => store.auth);
  const { isLoading } = useSelector(store => store.async);
  const { order } = useSelector(store => store.order);
  const { selectedBun, selectedIngredients } = useSelector(store => store.ingredients);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push('/login');
    } else {
      if (selectedBun && selectedIngredients.length > 0) {
        dispatch(postOrderAction(getIngredientIds(selectedBun, selectedIngredients)));
        dispatch(removeSelectedIngredientsAction(selectedBun));
      }
    }
  }, [dispatch, selectedBun, selectedIngredients, user, history]);

  return (
    <div className={orderDetailsStyles.container}>
      {isLoading ? (
        <span className={`text text_type_main-large ${orderDetailsStyles.loadingText}`}>
          Заказ создается...
        </span>
      ) : (
        <>
          <h2 className={orderDetailsStyles.digits}>{order?.number}</h2>
          <h3 className={`text text_type_main-default ${orderDetailsStyles.title}`}>
            {order?.name}
          </h3>
          <img className={orderDetailsStyles.image} src={checkImage} alt='check icon'></img>
          <p className={`text text_type_main-default ${orderDetailsStyles.topText}`}>
            Ваш заказ начали готовить
          </p>
          <p className={`text text_type_main-default ${orderDetailsStyles.bottomText}`}>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
}
