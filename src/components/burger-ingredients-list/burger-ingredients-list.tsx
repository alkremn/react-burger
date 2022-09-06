import React, { useEffect, useState } from 'react';
import listStyles from './burger-ingredients-list.module.css';
import BurgerIngredientsSection from '../burger-ingredients-section/burger-ingredients-section';
import { filterIngredients, titles } from '../../utils/utils';
// redux
import { useSelector } from '../../utils/hooks';

import { IIngredient } from '../../utils/types';

interface BurgerIngredientsListProps {
  listRefs: Array<(node?: Element | null | undefined) => void>;
  headerRefs: Array<React.MutableRefObject<HTMLDivElement | null>>;
}

export default function BurgerIngredientsList({
  listRefs,
  headerRefs,
}: BurgerIngredientsListProps) {
  const { ingredients } = useSelector(store => store.ingredients);
  const [filteredIngredients, setFilteredIngredients] = useState<IIngredient[][]>([[], [], []]);

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
          listRef={listRefs[i]}
          headerRef={headerRefs[i]}
        />
      ))}
    </ul>
  );
}
