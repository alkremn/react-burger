import React, { useMemo, useRef } from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import { useDrop, useDrag } from 'react-dnd';

// icons
import currencyIcon from '../../images/icons/currency_icon.svg';

// redux
import { useDispatch, useSelector } from 'react-redux';

// components
import {
  Button,
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { PropTypes } from 'prop-types';

// helper functions
import { calculateTotalCost } from '../../utils/utils';

// actions
import {
  addSelectedIngredient,
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

  const ref = useRef(null);
  const [{ hadlerId }, drop] = useDrop({
    accept: '',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: 'ingredients',
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDelete = ingredient => {
    dispatch(removeSelectedIngredient(ingredient));
  };

  const totalPrice = useMemo(() => {
    return calculateTotalCost(selectedBun, selectedIngredients);
  }, [selectedBun, selectedIngredients]);

  drag(drop(ref));

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
        {selectedIngredients.map(element => (
          <li
            key={element.uniqueId}
            className={burgerConstructorStyles.listItem}
            draggable
          >
            <div className={burgerConstructorStyles.dragIcon}>
              <DragIcon type='primary' />
            </div>
            <ConstructorElement
              key={element.uniqueId}
              isLocked={false}
              text={element.name}
              price={element.price}
              thumbnail={element.image_mobile}
              handleClose={e => handleDelete(element)}
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
