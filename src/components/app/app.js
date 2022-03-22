import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './app.module.css';

// redux

// components
import AppHeader from './../app-header/app-header';
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
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route
            path='/forgot-password'
            element={<ForgotPasswordPage />}
          ></Route>
          <Route path='/reset-password' element={<ResetPasswordPage />}></Route>
          <Route path='/profile' element={<ProfilePage />}></Route>
          <Route path='/ingredients/:id' element={<IngredientPage />}></Route>
          <Route path='/' element={<ConstructorPage />}></Route>
          <Route path='*' element={<NotFoundPage />}></Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
