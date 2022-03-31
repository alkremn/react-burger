import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './app.module.css';

// redux

// components
import AppHeader from './../app-header/app-header';
import { ProtectedRoute } from './../protected-route';
import { OrderHistory } from './../order-history/order-history';
import { ProfileDetails } from './../profile-details/profile-details';
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
  const { user } = useSelector(store => store.auth);
  const { isLoading } = useSelector(store => store.async);

  return (
    <Router>
      {isLoading && <Loading />}
      {user ? <AppHeader /> : null}
      <main className={styles.mainContainer}>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          <Route path='/' element={<ProtectedRoute />}>
            <Route exact path='/' element={<ConstructorPage />} />
            <Route path='/ingredients/:id' element={<IngredientPage />} />
            <Route path='/profile' element={<ProfilePage />}>
              <Route exact path='/profile' element={<ProfileDetails />} />
              <Route exact path='/profile/orders' element={<OrderHistory />} />
              <Route exact path='/profile/logout' element={<OrderHistory />} />
            </Route>
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
