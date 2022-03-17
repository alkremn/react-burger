import React, { useState, useEffect } from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';

// icons
import currencyIcon from '../../images/icons/currency_icon.svg';

// components
import {
  Button,
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { PropTypes } from 'prop-types';

// helper functions
import { calculateTotalCost } from '../../utils/utils';
import { useSelector } from 'react-redux';

export default function BurgerConstructor({ onFormSubmit }) {
  const { selectedBun, selectedIngredients } = useSelector(
    store => store.ingredients
  );
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (selectedBun) {
      setTotal(calculateTotalCost(selectedBun, selectedIngredients));
    }
  }, [selectedBun, selectedIngredients]);

  return (
    <form className={burgerConstructorStyles.container} onSubmit={onFormSubmit}>
      <div className={burgerConstructorStyles.bun_container}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={`${selectedBun?.name} (верх)`}
          price={selectedBun?.price}
          thumbnail={selectedBun?.image_mobile}
        />
      </div>
      <ul className={burgerConstructorStyles.list}>
        {selectedIngredients.map(element => (
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
          text={`${selectedBun?.name} (низ)`}
          price={selectedBun?.price}
          thumbnail={selectedBun?.image_mobile}
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
  onFormSubmit: PropTypes.func.isRequired,
};
