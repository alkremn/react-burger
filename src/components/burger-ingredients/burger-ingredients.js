import React, { useEffect, useState } from 'react';
import { ingredientPropTypes } from '../../utils/commonPropTypes';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsList from './../burger-ingredients-list/burger-ingredients-list';
import { titles, titlesEn } from '../../utils/utils';
import { PropTypes } from 'prop-types';

export default function BurgerIngredients({ ingredients }) {
  const [current, setCurrent] = useState(0);
  const [selectedIngridients, setSelectedIngridients] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(titles[0]);

  useEffect(() => {
    setSelectedIngridients(ingredients[titlesEn[0]]);
  }, [ingredients]);

  const handleMenuClick = idx => {
    setCurrent(idx);
    setCurrentTitle(titles[idx]);
    setSelectedIngridients(ingredients[titlesEn[idx]]);
  };

  return (
    <section>
      <div style={{ display: 'flex' }}>
        {titles.map((title, i) => (
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
      {selectedIngridients && (
        <BurgerIngredientsList
          title={currentTitle}
          ingredients={selectedIngridients}
        />
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.shape({
    buns: PropTypes.arrayOf(ingredientPropTypes.isRequired),
    mains: PropTypes.arrayOf(ingredientPropTypes.isRequired),
    souces: PropTypes.arrayOf(ingredientPropTypes.isRequired),
  }),
};
