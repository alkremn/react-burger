import React, { useEffect, useState } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppHeader from './../app-header/app-header';
import mainStyles from './app.module.css';
import BurgerConstructor from './../burger-constructor/burger-constructor';
import { data as dataJson } from '../../utils/data.js';
import { apiUrl } from './../../utils/utils';
import Modal from '../modal/modal';

function App() {
  const [selectedBun, setSelectedBun] = useState({});
  const [selectedIngridients, setSelectedIngridients] = useState([]);
  const [visible, setVisible] = useState(true);
  const [ingredients, setIngredients] = useState({
    buns: [],
    mains: [],
    sauces: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(apiUrl);
        // const dataJson = await response.json();

        const buns = [];
        const mains = [];
        const sauces = [];

        dataJson.forEach(i => {
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
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = e => {
    console.log(e.target.classList);
    if (!e.target.classList.contains('popup')) {
      setVisible(!visible);
    }
  };

  return (
    <>
      <AppHeader />
      <main className={mainStyles.mainContainer}>
        <div className={mainStyles.mainLayout}>
          <h1 className={`text text_type_main-default ${mainStyles.title}`}>
            Соберите бургер
          </h1>
          <div className={mainStyles.ingredients}>
            <BurgerIngredients
              ingredients={ingredients}
              onModalOpen={handleOpenModal}
            />
            <BurgerConstructor
              selectedBun={selectedBun}
              selectedIngredients={selectedIngridients}
            />
            {visible && <Modal onClose={handleOpenModal} />}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
