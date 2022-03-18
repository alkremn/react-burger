import React, { useRef } from 'react';
import burgerConstructorCardStyles from './burger-constructor-card.module.css';
import { useDrag, useDrop } from 'react-dnd';

// types
import { PropTypes } from 'prop-types';
import { ingredientPropTypes } from './../../utils/commonPropTypes';

// components
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export default function BurgerConstructorCard({
  index,
  element,
  onDelete,
  onIngredientMove,
}) {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'selectedIngredient',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      onIngredientMove(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'selectedIngredient',
    item: () => {
      return { id: element._id, index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <li
      className={burgerConstructorCardStyles.listItem}
      ref={ref}
      style={{ opacity }}
    >
      <div className={burgerConstructorCardStyles.dragIcon}>
        <DragIcon type='primary' />
      </div>
      <ConstructorElement
        isLocked={false}
        text={element.name}
        price={element.price}
        thumbnail={element.image_mobile}
        handleClose={e => onDelete(element)}
      />
    </li>
  );
}

BurgerConstructorCard.propTypes = {
  index: PropTypes.number.isRequired,
  element: ingredientPropTypes,
  onDelete: PropTypes.func.isRequired,
  onIngredientMove: PropTypes.func.isRequired,
};
