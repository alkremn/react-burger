import React, { useEffect, useState } from 'react';
import mainStyles from './app.module.css';

// redux
import { useDispatch, useSelector } from 'react-redux';

// actions
import { fetchIngredientsAction } from './../../services/actions/ingredientsActions';

// components
import AppHeader from './../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from './../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

// helper functions
import { filterIngredients, getRandomIntredients } from '../../utils/utils';

function App() {
  const { ingredients } = useSelector(store => store.ingredients);

  const [isVisible, setIsVisible] = useState(false);
  const [isIngredientDetailsSelected, setIsIngredientDetailsSelected] =
    useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

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
        <div className={mainStyles.ingredients}>
          <BurgerIngredients onPopupOpen={handleOpenPopup} />
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
      </main>
    </>
  );
}

export default App;
