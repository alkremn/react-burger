import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
import { fetchIngredientsAction } from '../../services/actions/ingredientsActions';

function App() {
  const { isLoading } = useSelector(store => store.async);
  const { ingredients } = useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredientsAction());
    }
  }, [ingredients, dispatch]);

  return (
    <Router>
      {isLoading && <Loader />}
      <AppHeader />
      <main className={styles.mainContainer}>
        <Switch>
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/forgot-password' component={ForgotPasswordPage} />
          <Route path='/reset-password' component={ResetPasswordPage} />
          <Route path='/' exact={true} component={ConstructorPage} />
          <IngredientPage path='/ingredients/:id' component={IngredientPage} />
          <ProtectedRoute path='/profile'>
            <ProfilePage />
          </ProtectedRoute>
          <Route path='*' component={NotFoundPage} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
