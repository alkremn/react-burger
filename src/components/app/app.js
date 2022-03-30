import React from 'react';
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

function App() {
  return (
    <Router>
      <AppHeader />
      <main className={styles.mainContainer}>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          <Route path='/profile' element={<ProtectedRoute />}>
            <Route path='/profile' element={<ProfilePage />}>
              <Route path='/profile/details' element={<ProfileDetails />} />
              <Route exact path='/profile/orders' element={<OrderHistory />} />
              <Route exact path='/profile/logout' element={<OrderHistory />} />
            </Route>
          </Route>
          <Route path='/ingredients/:id' element={<ProtectedRoute />}>
            <Route path='/ingredients/:id' element={<IngredientPage />} />
          </Route>
          <Route exact path='/' element={<ProtectedRoute />}>
            <Route exact path='/' element={<ConstructorPage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
