import React, { useEffect, useState } from 'react';
import { data as ingredientsData } from '../../utils/data';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppHeader from './../app-header/app-header';
import mainStyles from './app.module.css';
import BurgerConstructor from './../burger-constructor/burger-constructor';

function App() {
  const [selectedBun, setSelectedBun] = useState({});
  const [selectedIngridients, setSelectedIngridients] = useState([]);
  const [ingredients, setIngredients] = useState({
    buns: [],
    mains: [],
    sauces: [],
  });

  useEffect(() => {
    const buns = [];
    const mains = [];
    const sauces = [];

    ingredientsData.forEach(i => {
      switch (i.type) {
        case 'bun':
          buns.push(i);
          break;
        case 'main':
          mains.push(i);
          break;
        default:
          sauces.push(i);
          break;
      }

      setIngredients({
        buns: buns,
        mains: mains,
        sauces: sauces,
      });

      setSelectedBun(buns[0]);
      setSelectedIngridients([...mains, ...sauces]);
    });
  }, []);

  return (
    <>
      <AppHeader />
      <main className={mainStyles.mainContainer}>
        <div className={mainStyles.mainLayout}>
          <h1 className={`text text_type_main-default ${mainStyles.title}`}>
            Соберите бургер
          </h1>
          <div className={mainStyles.ingredients}>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor
              selectedBun={selectedBun}
              selectedIngredients={selectedIngridients}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
