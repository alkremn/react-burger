import React, { useEffect, useState } from 'react';
import styles from './login.module.css';

// react-router
import { Link } from 'react-router-dom';

// redux
import { useDispatch } from 'react-redux';

// constants
import {
  WRONG_EMAIL_TITLE,
  ENTER_NAME_TITLE,
  MAX_PASSWORD_LENGTH,
} from '../utils/utils';

// helper methods
import {
  validateEmail,
  isEmailEmpty,
  isPasswordEmpty,
  isPasswordShort,
} from './../utils/utils';

// actions
import { registerAction } from '../services/actions/authActions';

// components
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const [errors, setErrors] = useState({ name: '', email: '', password: '' });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleValidateInput = e => {
    if (e.target.name === 'email') {
      const emailText = e.target.value;
      if (!validateEmail(emailText)) {
        setErrors({ ...errors, email: WRONG_EMAIL_TITLE });
      } else {
        setErrors({ ...errors, email: '' });
      }
    }

    if (e.target.name === 'name') {
      if (e.target.value === '') {
        setErrors({ ...errors, name: ENTER_NAME_TITLE });
      } else {
        setErrors({ ...errors, name: '' });
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

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(registerAction(form));
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>
        Регистрация
      </h2>
      <div className={styles.inputContainer}>
        <Input
          name='name'
          placeholder='Имя'
          value={form.name}
          error={errors.name !== ''}
          errorText={errors.name}
          onBlur={handleValidateInput}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <Input
          name='email'
          placeholder='E-mail'
          value={form.email}
          error={errors.email !== ''}
          errorText={errors.email}
          onBlur={handleValidateInput}
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
        <Button type='primary' size='medium' disabled={isSubmitDisabled}>
          Зарегистрироваться
        </Button>
      </div>
      <span className={`text text_type_main-default ${styles.bottomText}`}>
        Уже зарегистрированы?
        <Link className={styles.link} to='/login'>
          Войти
        </Link>
      </span>
    </form>
  );
};
