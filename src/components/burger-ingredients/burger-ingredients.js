import React, { useEffect, useRef, useState } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';

// components
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsList from './../burger-ingredients-list/burger-ingredients-list';
import burgerIngredientsStyles from './burger-ingredients.module.css';

// helper functions
import { filterIngredients, titles, titlesEn } from '../../utils/utils';

// actions
import { fetchIngredientsAction } from './../../services/actions/ingredientsActions';

// types
import { PropTypes } from 'prop-types';
import { useInView } from 'react-intersection-observer';

export default function BurgerIngredients({ onPopupOpen }) {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState(0);

  const [firstListRef, firstInView] = useInView({ threshold: 0.2 });
  const [secondListRef, secondInView] = useInView({ threshold: 0.2 });
  const [thridListRef, thirdInView] = useInView({ threshold: 0.2 });
  const listRefs = [firstListRef, secondListRef, thridListRef];

  const firstHeaderRef = useRef(null);
  const secondHeaderRef = useRef(null);
  const thirdHeaderRef = useRef(null);
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

  useEffect(() => {
    dispatch(fetchIngredientsAction());
  }, [dispatch]);

  const handleMenuClick = idx => {
    setCurrentTab(idx);
    if (headerRefs[idx].current) {
      headerRefs[idx].current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={burgerIngredientsStyles.container}>
      <h1
        className={`text text_type_main-default ${burgerIngredientsStyles.title}`}
      >
        Соберите бургер
      </h1>
      <div className={burgerIngredientsStyles.menu}>
        {titles &&
          titles.map((title, i) => (
            <Tab
              key={i}
              value={i}
              active={currentTab === i}
              onClick={handleMenuClick}
            >
              {title}
            </Tab>
          ))}
      </div>
      <BurgerIngredientsList
        onPopupOpen={onPopupOpen}
        listRefs={listRefs}
        headerRefs={headerRefs}
      />
    </section>
  );
}

BurgerIngredients.propTypes = {
  onPopupOpen: PropTypes.func.isRequired,
};
