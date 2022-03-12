import React, { useEffect, useState, useReducer } from 'react';
import mainStyles from './app.module.css';

// constants
import { ADD_SELECTED_BUN } from './../../utils/constants';
import { ADD_INGREDIENTS } from './../../utils/constants';

// components
import AppHeader from './../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from './../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

// api
import { apiUrl } from './../../utils/utils';

// context
import { SelectedIngredientsContext } from '../../services/selectedIngredientsContext';
import { SelectedBunContext } from '../../services/selectedBunContext';

// reducers and initial values
import {
  selectedIngredientsReducer,
  selectedIngredientsInitialState,
} from '../../store/selectedIngredientsStore';
import {
  selectedBunReducer,
  selectedBunInitialState,
} from '../../store/selectedBunStore';

function App() {
  const [selectedBunState, selectedBunDispatcher] = useReducer(
    selectedBunReducer,
    selectedBunInitialState
  );
  const [selectedIngredientsState, selectedIngredientsDispatcher] = useReducer(
    selectedIngredientsReducer,
    selectedIngredientsInitialState
  );

  const [ingredients, setIngredients] = useState({});
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
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка ${res.status}`);
        }
        return res.json();
      })
      .then(dataJson => {
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

          selectedBunDispatcher({ type: ADD_SELECTED_BUN, payload: buns[0] });
          selectedIngredientsDispatcher({
            type: ADD_INGREDIENTS,
            payload: [...mains, ...sauces],
          });
          setSelectedIngredient(mains[0]);
        });
      })
      .catch(error => {
        console.log(error);
      });
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
    <SelectedIngredientsContext.Provider
      value={{
        selectedIngredientsState,
        selectedIngredientsDispatcher,
      }}
    >
      <SelectedBunContext.Provider
        value={{ selectedBunState, selectedBunDispatcher }}
      >
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
              <BurgerConstructor onFormSubmit={handleFormSubmit} />
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
      </SelectedBunContext.Provider>
    </SelectedIngredientsContext.Provider>
  );
}

export default App;
