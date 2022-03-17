import React, { useEffect, useState } from 'react';

import { filterIngredients, titles } from '../../utils/utils';

import listStyles from './burger-ingredients-list.module.css';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import BurgerIngredientsSection from '../burger-ingredients-section/burger-ingredients-section';

export default function BurgerIngredientsList({
  onPopupOpen,
  listRefs,
  headerRefs,
}) {
  const { ingredients } = useSelector(store => store.ingredients);
  const [filteredIngredients, setFilteredIngredients] = useState([[], [], []]);

  useEffect(() => {
    if (ingredients.length > 0) {
      setFilteredIngredients(filterIngredients(ingredients));
    }
  }, [ingredients]);

  return (
    <ul className={listStyles.list}>
      {titles.map((title, i) => (
        <BurgerIngredientsSection
          key={i}
          title={title}
          ingredients={filteredIngredients[i]}
          onPopupOpen={onPopupOpen}
          listRef={listRefs[i]}
          headerRef={headerRefs[i]}
        />
      ))}
    </ul>
  );
}

BurgerIngredientsList.propTypes = {
  onPopupOpen: PropTypes.func.isRequired,
};
