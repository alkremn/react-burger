import React, { useState } from 'react';
import currencyIcon from '../../images/icons/currency_icon.svg';
import { ingredientPropTypes } from '../../utils/commonPropTypes';
import {
  Button,
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import { PropTypes } from 'prop-types';

export default function BurgerConstructor({ elements }) {
  const [total, setTotal] = useState(610);

  return (
    <section className={burgerConstructorStyles.container}>
      <ul className={burgerConstructorStyles.list}>
        {elements.map((element, i) => (
          <li key={element._id} className={burgerConstructorStyles.listItem}>
            {i > 0 && i < elements.length - 1 && (
              <div className={burgerConstructorStyles.dragIcon}>
                <DragIcon type='primary' />
              </div>
            )}
            <ConstructorElement
              key={element._id}
              type={i === 0 ? 'top' : i === elements.length - 1 ? 'bottom' : ''}
              isLocked={false}
              text={element.name}
              price={element.price}
              thumbnail={element.image_mobile}
            />
          </li>
        ))}
      </ul>
      <div className={burgerConstructorStyles.bottomContainer}>
        <span>{total}</span>
        <img
          className={burgerConstructorStyles.currencyIcon}
          src={currencyIcon}
          alt='currency icon'
        />
        <Button type='primary' size='large'>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  elements: PropTypes.arrayOf(ingredientPropTypes.isRequired),
};
