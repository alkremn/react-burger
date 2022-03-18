import React, { useState } from 'react';
import mainStyles from './app.module.css';

// redux
import { useSelector } from 'react-redux';

// components
import AppHeader from './../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from './../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

// react-dnd
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const { ingredients, selectedIngredients } = useSelector(
    store => store.ingredients
  );

  const [isVisible, setIsVisible] = useState(false);
  const [isIngredientDetailsSelected, setIsIngredientDetailsSelected] =
    useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const handleFormSubmit = e => {
    e.preventDefault();
    if (selectedIngredients.length > 0) {
      setIsVisible(true);
    }
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
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients onPopupOpen={handleOpenPopup} />
            <BurgerConstructor onFormSubmit={handleFormSubmit} />
          </DndProvider>
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
