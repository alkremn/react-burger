import React, { useEffect, useState } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppHeader from './../app-header/app-header';
import mainStyles from './app.module.css';
import BurgerConstructor from './../burger-constructor/burger-constructor';
import { apiUrl } from './../../utils/utils';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

function App() {
  const [selectedBun, setSelectedBun] = useState({});
  const [ingredients, setIngredients] = useState({});
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isIngredientDetailsSelected, setIsIngredientDetailsSelected] =
    useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [filteredIngredients, setfilteredIngredients] = useState({
    buns: [],
    mains: [],
    sauces: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}`);
        }

        const dataJson = await response.json();
        setIngredients(dataJson.data);

        const buns = [];
        const mains = [];
        const sauces = [];

        dataJson.data.forEach(i => {
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

          setfilteredIngredients({
            buns: buns,
            mains: mains,
            sauces: sauces,
          });

          setSelectedBun(buns[0]);
          setSelectedIngredients([...mains, ...sauces]);
          setSelectedIngredient(mains[0]);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleFormSubmit = e => {
    e.preventDefault();
    setIsVisible(true);
  };

  const handleOpenPopup = id => {
    const selectedIngredient = ingredients.find(item => item._id === id);
    setSelectedIngredient(selectedIngredient);
    setIsIngredientDetailsSelected(true);
    setIsVisible(true);
  };

  const handleClosePopup = () => {
    setIsIngredientDetailsSelected(false);
    setIsVisible(false);
    setSelectedIngredient(null);
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
              ingredients={filteredIngredients}
              onPopupOpen={handleOpenPopup}
            />
            <BurgerConstructor
              selectedBun={selectedBun}
              selectedIngredients={selectedIngredients}
              onFormSubmit={handleFormSubmit}
            />
            {isVisible && (
              <Modal onClose={handleClosePopup}>
                {isIngredientDetailsSelected ? (
                  <IngredientDetails ingredient={selectedIngredient} />
                ) : (
                  <OrderDetails />
                )}
              </Modal>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
