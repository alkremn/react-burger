import React from 'react';
import orderDetailsStyles from './order-details.module.css';

// icons
import checkImage from '../../images/icons/check_mark.svg';

// helpers
import { useSelector } from 'react-redux';
import { IMainStore } from '../../utils/types';

export default function OrderDetails() {
  const { isLoading } = useSelector((store: IMainStore) => store.async);
  const { order } = useSelector((store: IMainStore) => store.order);

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
