import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import listStyles from './burger-constructor.module.css';

export default function BurgerConstructor({ elements }) {
  return (
    <section className={listStyles.container}>
      <ul className={listStyles.list}>
        {elements.map((element, i) => (
          <li>
            <DragIcon type='primary' />
            <ConstructorElement
              key={element._id}
              type={i === 0 ? 'top' : i === elements.length - 1 ? 'bottom' : ''}
              isLocked={true}
              text={element.name}
              price={element.price}
              thumbnail={element.image_mobile}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
