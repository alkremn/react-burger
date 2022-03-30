import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './reset-password.module.css';

import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { validateEmail } from '../utils/utils';

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({ password: '', code: '' });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleInputChange = e => {
    const emailText = e.target.value;
    setForm({ ...form, [e.target.name]: emailText });
  };

  const handleValidateInput = e => {
    const emailText = e.target.value;
    if (e.target.name === 'email') {
      if (!validateEmail(emailText)) {
        //setErrors({ ...errors, email: 'Некорректный E-mail' });
        console.log('asdf');
      } else {
        //setErrors({ ...errors, email: '' });
      }
    }
  };

  useEffect(() => {
    if (form.password !== '' && form.code !== '') {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [form]);

  const handleSubmit = e => {};

  return (
    <div className={styles.container}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>
        Восстановление пароля
      </h2>
      <div className={styles.inputContainer}>
        <PasswordInput
          name='password'
          placeholder='Введите новый пароль'
          value={form.password}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <Input
          name='code'
          placeholder='Введите код из письма'
          value={form.code}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.ButtonContainer}>
        <Button type='primary' disabled={isSubmitDisabled} size='medium'>
          Сохранить
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
