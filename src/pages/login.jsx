import React, { useEffect, useState } from 'react';
import styles from './login.module.css';
import { Link, useHistory } from 'react-router-dom';

import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  isEmailEmpty,
  isPasswordEmpty,
  isPasswordShort,
  MAX_PASSWORD_LENGTH,
  validateEmail,
} from './../utils/utils';
import { loginAction } from '../services/actions/authActions';

export const LoginPage = ({ location }) => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const history = useHistory();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleValidateInput = e => {
    const emailText = e.target.value;
    if (e.target.name === 'email') {
      if (!validateEmail(emailText)) {
        setErrors({ ...errors, email: 'Некорректный E-mail' });
      } else {
        setErrors({ ...errors, email: '' });
      }
    }
  };

  useEffect(() => {
    if (
      !isEmailEmpty(form.email) &&
      !isPasswordEmpty(form.password) &&
      !isPasswordShort(form.password, MAX_PASSWORD_LENGTH)
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [form]);

  useEffect(() => {
    if (user) {
      if (location.from) {
        history.replace({ pathname: location.from });
      } else {
        history.replace({ pathname: '/' });
      }
    }
  }, [user, history, location]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginAction(form));
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>Вход</h2>
      <div className={styles.inputContainer}>
        <Input
          name='email'
          placeholder='E-mail'
          value={form.email}
          onBlur={handleValidateInput}
          onChange={handleInputChange}
          error={errors.email !== ''}
          errorText={errors.email}
        />
      </div>
      <div className={styles.inputContainer}>
        <PasswordInput name='password' value={form.password} onChange={handleInputChange} />
      </div>
      <div className={styles.ButtonContainer}>
        <Button type='primary' size='medium' disabled={isSubmitDisabled} htmlType='submit'>
          Войти
        </Button>
      </div>
      <span className={`text text_type_main-default ${styles.bottomText}`}>
        Вы — новый пользователь?
        <Link className={styles.link} to='/register'>
          Зарегистрироваться
        </Link>
      </span>
      <span className='text text_type_main-default'>
        Забыли пароль?
        <Link className={styles.link} to='/forgot-password'>
          Восстановить пароль
        </Link>
      </span>
    </form>
  );
};
