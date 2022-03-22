import React, { useState } from 'react';
import styles from './constructor.module.css';

// redux
import { useSelector } from 'react-redux';

// react-dnd
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// components
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import IngredientDetails from './../components/ingredient-details/ingredient-details';
import OrderDetails from '../components/order-details/order-details';
import Modal from '../components/modal/modal';

export const ConstructorPage = () => {
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
    <div className={styles.ingredients}>
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
  );
};
