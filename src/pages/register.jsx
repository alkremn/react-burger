import React, { useState } from 'react';
import styles from './login.module.css';
import { Link } from 'react-router-dom';

import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>
        Регистрация
      </h2>
      <div className={styles.inputContainer}>
        <Input
          name='text'
          placeholder='Name'
          value={form.name}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <EmailInput
          name='email'
          value={form.email}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <PasswordInput
          name='password'
          value={form.password}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.ButtonContainer}>
        <Button type='primary' size='medium'>
          Войти
        </Button>
      </div>
      <span className={`text text_type_main-small ${styles.bottomText}`}>
        Уже зарегистрированы?
        <Link className={styles.link} to='/login'>
          Войти
        </Link>
      </span>
    </div>
  );
};
