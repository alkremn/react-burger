import React, { useEffect, useState } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import styles from './app.module.css';

// components
import AppHeader from './../app-header/app-header';
import { ProtectedRoute } from './../protected-route';
import {
  LoginPage,
  RegisterPage,
  ConstructorPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
  NotFoundPage,
} from '../../pages/index';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../loader/loader';
import {
  fetchIngredientsAction,
  removeDetailedIngredient,
} from '../../services/actions/ingredientsActions';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

function App() {
  const { isLoading } = useSelector(store => store.async);
  const { ingredients } = useSelector(store => store.ingredients);
  const { order } = useSelector(store => store.order);

  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredientsAction());
    }
  }, [ingredients, dispatch]);

  useEffect(() => {
    if (order) {
      setIsVisible(true);
    }
  }, [order]);

  const handleClosePopup = () => {
    history.push('/');
    dispatch(removeDetailedIngredient());
  };
  const handleOrderDetailsClose = () => {
    setIsVisible(false);
  };

  const background = location.state && location.state.background;

  return (
    <>
      {isLoading && <Loader />}
      <AppHeader />
      <main className={styles.mainContainer}>
        <Switch location={background || location}>
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/forgot-password' component={ForgotPasswordPage} />
          <Route path='/reset-password' component={ResetPasswordPage} />
          <Route path='/' exact={true}>
            <ConstructorPage />
          </Route>
          <Route path='/ingredients/:id' children={<IngredientPage />} />
          <ProtectedRoute path='/profile'>
            <ProfilePage />
          </ProtectedRoute>
          <Route path='*' component={NotFoundPage} />
        </Switch>

        {background && (
          <Route
            path='/ingredients/:id'
            children={
              <Modal onClose={handleClosePopup}>
                <IngredientDetails />
              </Modal>
            }
          />
        )}
        {isVisible && (
          <Modal onClose={handleOrderDetailsClose}>
            <OrderDetails />
          </Modal>
        )}
      </main>
    </>
  );
}

export default App;
