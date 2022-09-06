import React, { FormEvent, useCallback, useMemo } from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import { useDrop } from 'react-dnd';

// icons
import currencyIcon from '../../images/icons/currency_icon.svg';

// components
import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorCard from '../burger-constructor-card/burger-constructor-card';

// helper functions
import { calculateTotalCost, getIngredientIds } from '../../utils/utils';

// actions
import {
  addSelectedIngredientAction,
  addSelectedIngredientsAction,
  removeSelectedIngredientAction,
  removeSelectedIngredientsAction,
} from '../../services/actions/ingredientsActions';
import { postOrderAction } from '../../services/actions/orderActions';

import { useHistory } from 'react-router-dom';
import { IIngredient } from '../../utils/types';
import { useDispatch } from '../../utils/hooks';
import { useSelector } from './../../utils/hooks';

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);
  const history = useHistory();
  const { selectedBun, selectedIngredients } = useSelector(store => store.ingredients);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient: IIngredient) {
      dispatch(addSelectedIngredientAction(selectedBun, ingredient));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
  });

  const handleDelete = (ingredient: IIngredient) => {
    dispatch(removeSelectedIngredientAction(ingredient));
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      history.push('/login');
    } else {
      if (selectedBun) {
        dispatch(postOrderAction(getIngredientIds(selectedBun, selectedIngredients)));
        dispatch(removeSelectedIngredientsAction(selectedBun));
      }
    }
  };

  const handleIngredientMove = useCallback(
    (dragIndex: number, hoverIndex: number) => {
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
          <span className={`text text_type_main-default ${burgerConstructorStyles.emptyListText}`}>
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
            <Button type='primary' size='large' htmlType='submit'>
              Оформить заказ
            </Button>
          </div>
        )}
      </>
    </form>
  );
}
