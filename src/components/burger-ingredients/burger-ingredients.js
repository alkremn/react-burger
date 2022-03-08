import React, { useEffect, useState } from 'react';
import { ingredientPropTypes } from '../../utils/commonPropTypes';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsList from './../burger-ingredients-list/burger-ingredients-list';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { titles, titlesEn } from '../../utils/utils';
import { PropTypes } from 'prop-types';

export default function BurgerIngredients({ ingredients, onModalOpen }) {
  const [current, setCurrent] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(titles[0]);

  useEffect(() => {
    setSelectedIngredients(ingredients[titlesEn[0]]);
  }, [ingredients]);

  const handleMenuClick = idx => {
    setCurrent(idx);
    setCurrentTitle(titles[idx]);
    setSelectedIngredients(ingredients[titlesEn[idx]]);
  };

  return (
    <section>
      <div className={burgerIngredientsStyles.menu}>
        {titles &&
          titles.map((title, i) => (
            <Tab
              key={i}
              value={i}
              active={current === i}
              onClick={handleMenuClick}
            >
              {title}
            </Tab>
          ))}
      </div>
      {selectedIngredients && (
        <BurgerIngredientsList
          title={currentTitle}
          ingredients={selectedIngredients}
          onModalOpen={onModalOpen}
        />
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.shape({
    buns: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    mains: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    sauces: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  }),
};
