import React from 'react';
import checkImage from '../../images/icons/check_mark.svg';
import orderDetailsStyles from './order-details.module.css';

export default function OrderDetails() {
  return (
    <div className={orderDetailsStyles.container}>
      <h2 className={orderDetailsStyles.digits}>034536</h2>
      <h3 className={`text text_type_main-default ${orderDetailsStyles.title}`}>
        идентификатор заказа
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
    </div>
  );
}
