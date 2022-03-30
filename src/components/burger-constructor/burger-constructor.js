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
  addSelectedIngredientAction,
  addSelectedIngredientsAction,
  removeSelectedIngredientAction,
} from './../../services/actions/ingredientsActions';

export default function BurgerConstructor({ onFormSubmit }) {
  const dispatch = useDispatch();
  const { selectedBun, selectedIngredients } = useSelector(
    store => store.ingredients
  );

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      dispatch(addSelectedIngredientAction(selectedBun, ingredient));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
  });

  const handleDelete = ingredient => {
    dispatch(removeSelectedIngredientAction(ingredient));
  };

  const handleIngredientMove = useCallback(
    (dragIndex, hoverIndex) => {
      const ingredients = [...selectedIngredients];
      ingredients.splice(hoverIndex, 0, ingredients.splice(dragIndex, 1)[0]);
      dispatch(addSelectedIngredientsAction(ingredients));
    },
    [dispatch, selectedIngredients]
  );

  const totalPrice = useMemo(() => {
    return calculateTotalCost(selectedBun, selectedIngredients);
  }, [selectedBun, selectedIngredients]);

  return (
    <form
      className={`${burgerConstructorStyles.container} ${
        isHover ? burgerConstructorStyles.borderStyle : ''
      }`}
      onSubmit={onFormSubmit}
      ref={dropTarget}
    >
      <>
        {selectedBun ? (
          <div className={burgerConstructorStyles.bun_container}>
            <ConstructorElement
              type='top'
              isLocked={true}
              text={`${selectedBun?.name} (верх)`}
              price={selectedBun?.price}
              thumbnail={selectedBun?.image_mobile}
            />
          </div>
        ) : selectedIngredients.length > 0 ? (
          <span
            className={`text text_type_main-default ${burgerConstructorStyles.emptyListText}`}
          >
            Пожалуйста, выберите булку
          </span>
        ) : null}
        {selectedIngredients.length > 0 ? (
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
        ) : (
          <span
            className={`text text_type_main-default ${burgerConstructorStyles.list} ${burgerConstructorStyles.emptyListText}`}
          >
            Пожалуйста, перенесите сюда {!selectedBun && 'булку и '}
            ингредиенты для создания заказа
          </span>
        )}
        <div className={burgerConstructorStyles.bun_container}>
          {selectedBun && (
            <ConstructorElement
              type='bottom'
              isLocked={true}
              text={`${selectedBun?.name} (низ)`}
              price={selectedBun?.price}
              thumbnail={selectedBun?.image_mobile}
            />
          )}
        </div>
        {selectedBun && selectedIngredients.length > 0 && (
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
        )}
      </>
    </form>
  );
}

BurgerConstructor.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
