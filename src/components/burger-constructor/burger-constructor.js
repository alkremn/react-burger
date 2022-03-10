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

export default function BurgerConstructor({
  selectedBun,
  selectedIngredients,
  onFormSubmit,
}) {
  const [total] = useState(610);

  return (
    <form className={burgerConstructorStyles.container} onSubmit={onFormSubmit}>
      <div className={burgerConstructorStyles.bun_container}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={`${selectedBun.name} (верх)`}
          price={selectedBun.price}
          thumbnail={selectedBun.image_mobile}
        />
      </div>
      <ul className={burgerConstructorStyles.list}>
        {selectedIngredients &&
          selectedIngredients.map(element => (
            <li key={element._id} className={burgerConstructorStyles.listItem}>
              <div className={burgerConstructorStyles.dragIcon}>
                <DragIcon type='primary' />
              </div>
              <ConstructorElement
                key={element._id}
                isLocked={false}
                text={element.name}
                price={element.price}
                thumbnail={element.image_mobile}
              />
            </li>
          ))}
      </ul>
      <div className={burgerConstructorStyles.bun_container}>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text={`${selectedBun.name} (низ)`}
          price={selectedBun.price}
          thumbnail={selectedBun.image_mobile}
        />
      </div>
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
    </form>
  );
}

BurgerConstructor.propTypes = {
  selectedBun: ingredientPropTypes,
  selectedIngredients: PropTypes.arrayOf(ingredientPropTypes),
  onFormSubmit: PropTypes.func.isRequired,
};
