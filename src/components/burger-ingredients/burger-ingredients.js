import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsList from './../burger-ingredients-list/burger-ingredients-list';

export default function BurgerIngredients({ ingredients }) {
  const [current, setCurrent] = useState('one');

  return (
    <section>
      <div style={{ display: 'flex' }}>
        <Tab value='one' active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='two' active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='three' active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      {/* <BurgerIngredientsList title='Булки' ingredients={buns} /> */}
      <BurgerIngredientsList title='Соусы' ingredients={ingredients.mains} />
      {/* <BurgerIngredientsList title='Начинки' ingredients={sauces} /> */}
    </section>
  );
}
