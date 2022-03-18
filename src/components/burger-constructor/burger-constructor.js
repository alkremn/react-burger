import React, { useCallback, useMemo } from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import { PropTypes } from 'prop-types';
import { useDrop } from 'react-dnd';

// icons
import currencyIcon from '../../images/icons/currency_icon.svg';

// redux
import { useDispatch, useSelector } from 'react-redux';

// components
import {
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorCard from '../burger-constructor-card/burger-constructor-card';

// helper functions
import { calculateTotalCost } from '../../utils/utils';

// actions
import {
  addSelectedIngredient,
  addSelectedIngredients,
  removeSelectedIngredient,
} from './../../services/actions/ingredientsActions';

export default function BurgerConstructor({ onFormSubmit }) {
  const dispatch = useDispatch();
  const { selectedBun, selectedIngredients } = useSelector(
    store => store.ingredients
  );

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop({ ingredient }) {
      dispatch(addSelectedIngredient(ingredient));
    },
  });

  const handleDelete = ingredient => {
    dispatch(removeSelectedIngredient(ingredient));
  };

  const handleIngredientMove = useCallback(
    (dragIndex, hoverIndex) => {
      const ingredients = [...selectedIngredients];
      ingredients.splice(hoverIndex, 0, ingredients.splice(dragIndex, 1)[0]);
      dispatch(addSelectedIngredients(ingredients));
    },
    [dispatch, selectedIngredients]
  );

  const totalPrice = useMemo(() => {
    return calculateTotalCost(selectedBun, selectedIngredients);
  }, [selectedBun, selectedIngredients]);

  return (
    <form
      className={burgerConstructorStyles.container}
      onSubmit={onFormSubmit}
      ref={dropTarget}
    >
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
        {selectedIngredients.map((element, i) => (
          <BurgerConstructorCard
            key={element.uniqueId}
            index={i}
            element={element}
            onDelete={handleDelete}
            onIngredientMove={handleIngredientMove}
          />
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
        <span>{totalPrice}</span>
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
