import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { titles } from '../../utils/utils';

// components
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list';
import burgerIngredientsStyles from './burger-ingredients.module.css';

export default function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState(0);

  const [firstListRef, firstInView] = useInView({ threshold: 0.2 });
  const [secondListRef, secondInView] = useInView({ threshold: 0.2 });
  const [thridListRef, thirdInView] = useInView({ threshold: 0.2 });
  const listRefs = [firstListRef, secondListRef, thridListRef];

  const firstHeaderRef = useRef<HTMLDivElement | null>(null);
  const secondHeaderRef = useRef<HTMLDivElement | null>(null);
  const thirdHeaderRef = useRef<HTMLDivElement | null>(null);
  const headerRefs = [firstHeaderRef, secondHeaderRef, thirdHeaderRef];

  useEffect(() => {
    if (firstInView) {
      setCurrentTab(0);
    } else if (secondInView) {
      setCurrentTab(1);
    } else {
      setCurrentTab(2);
    }
  }, [firstInView, secondInView, thirdInView]);

  const handleMenuClick = (idx: string) => {
    const intIdx = parseInt(idx);
    setCurrentTab(intIdx);
    if (headerRefs[intIdx].current) {
      headerRefs[intIdx].current!.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={burgerIngredientsStyles.container}>
      <h1 className={`text text_type_main-default ${burgerIngredientsStyles.title}`}>
        Соберите бургер
      </h1>
      <div className={burgerIngredientsStyles.menu}>
        {titles &&
          titles.map((title, i) => (
            <Tab key={i} value={i.toString()} active={currentTab === i} onClick={handleMenuClick}>
              {title}
            </Tab>
          ))}
      </div>
      <BurgerIngredientsList listRefs={listRefs} headerRefs={headerRefs} />
    </section>
  );
}
