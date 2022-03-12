import React, { useState, useContext, useEffect } from 'react';
import currencyIcon from '../../images/icons/currency_icon.svg';
import { ingredientPropTypes } from '../../utils/commonPropTypes';
import {
  Button,
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import { PropTypes } from 'prop-types';

// context
import { SelectedBunContext } from '../../services/selectedBunContext';
import { SelectedIngredientsContext } from '../../services/selectedIngredientsContext';

export default function BurgerConstructor({ onFormSubmit }) {
  const { selectedBunState } = useContext(SelectedBunContext);
  const { selectedIngredientsState } = useContext(SelectedIngredientsContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (
      selectedBunState.selectedBun &&
      selectedIngredientsState.selectedIngredients
    ) {
      const bunPrice = selectedBunState.selectedBun.price;
      const ingredientsTotal =
        selectedIngredientsState.selectedIngredients.reduce(
          (prevItem, currentItem) => {
            console.log(prevItem);
            return prevItem.price + currentItem.price;
          },
          0
        );
      console.log(selectedIngredientsState.selectedIngredients);
      setTotal(bunPrice + ingredientsTotal);
    }
  }, [
    selectedBunState.selectedBun,
    selectedIngredientsState.selectedIngredients,
  ]);

  return (
    <form className={burgerConstructorStyles.container} onSubmit={onFormSubmit}>
      <div className={burgerConstructorStyles.bun_container}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={`${selectedBunState.selectedBun?.name} (верх)`}
          price={selectedBunState.selectedBun?.price}
          thumbnail={selectedBunState.selectedBun?.image_mobile}
        />
      </div>
      <ul className={burgerConstructorStyles.list}>
        {selectedIngredientsState.selectedIngredients &&
          selectedIngredientsState.selectedIngredients.map(element => (
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
          text={`${selectedBunState.selectedBun?.name} (низ)`}
          price={selectedBunState.selectedBun?.price}
          thumbnail={selectedBunState.selectedBun?.image_mobile}
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
