import React, { useRef } from 'react';
import burgerConstructorCardStyles from './burger-constructor-card.module.css';
import { useDrag, useDrop } from 'react-dnd';

import { IIngredient } from '../../utils/types';

// components
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IBurgerConstructorCardProps {
  index: number;
  element: IIngredient;
  onDelete: (element: IIngredient) => void;
  onIngredientMove: (dragIndex: number, hoverIndex: number) => void;
}

type DragObject = {
  index: number;
};

export default function BurgerConstructorCard({
  index,
  element,
  onDelete,
  onIngredientMove,
}: IBurgerConstructorCardProps) {
  const ref = useRef<HTMLLIElement | null>(null);

  const [, drop] = useDrop({
    accept: 'selectedIngredient',
    hover(item: DragObject, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
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
    <li className={burgerConstructorCardStyles.listItem} ref={ref} style={{ opacity }}>
      <div className={burgerConstructorCardStyles.dragIcon}>
        <DragIcon type='primary' />
      </div>
      <ConstructorElement
        isLocked={false}
        text={element.name}
        price={element.price}
        thumbnail={element.image_mobile}
        handleClose={() => onDelete(element)}
      />
    </li>
  );
}
