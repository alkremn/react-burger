import React from 'react';
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
import { useSelector } from 'react-redux';
import { Loading } from '../loading/loading';

function App() {
  const { isLoading } = useSelector(store => store.async);

  return (
    <Router>
      {isLoading && <Loading />}
      <AppHeader />
      <main className={styles.mainContainer}>
        <Switch>
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/forgot-password' component={ForgotPasswordPage} />
          <Route path='/reset-password' component={ResetPasswordPage} />
          <Route path='/' exact={true} component={ConstructorPage} />
          <ProtectedRoute path='/ingredients/:id'>
            <IngredientPage />
          </ProtectedRoute>
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
