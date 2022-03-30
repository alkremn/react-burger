import React, { useState } from 'react';
import styles from './forgot-password.module.css';

import { Link } from 'react-router-dom';
import { validateEmail } from '../utils/utils';

// redux
import { useDispatch } from 'react-redux';

import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: '' });
  const [isActive, setIsActive] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = e => {
    const emailText = e.target.value;
    setForm({ ...form, [e.target.name]: emailText });

    const isValid = validateEmail(emailText);
    setIsValid(isValid);

    if (isValid) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const handleSubmit = e => {};

  return (
    <div className={styles.container}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>
        Восстановление пароля
      </h2>
      <div className={styles.inputContainer}>
        <Input
          name='email'
          type='email'
          placeholder='Укажите e-mail'
          value={form.email}
          error={!isValid}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.ButtonContainer}>
        <Button
          type='primary'
          size='medium'
          disabled={!isActive}
          onClick={handleSubmit}
        >
          Восстановить
        </Button>
      </div>
      <span className={`text text_type_main-default ${styles.bottomText}`}>
        Вспомнили пароль?
        <Link className={styles.link} to='/login'>
          Войти
        </Link>
      </span>
    </div>
  );
};
