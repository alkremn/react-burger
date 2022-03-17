import React, { useCallback, useEffect, useRef, useState } from 'react';

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

export default function BurgerIngredients({ onPopupOpen }) {
  const dispatch = useDispatch();
  const firstRef = useRef(null);
  const secRef = useRef(null);
  const thirdRef = useRef(null);
  const arrayRef = [firstRef, secRef, thirdRef];

  const handleScroll = e => {
    console.log(e);
  };

  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    dispatch(fetchIngredientsAction());
  }, [dispatch]);

  const handleMenuClick = idx => {
    setCurrentTab(idx);
    if (arrayRef[idx]) {
      arrayRef[idx].current.scrollIntoView({ behavior: 'smooth' });
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
        onScroll={handleScroll}
      />
    </section>
  );
}

BurgerIngredients.propTypes = {
  onPopupOpen: PropTypes.func.isRequired,
};
