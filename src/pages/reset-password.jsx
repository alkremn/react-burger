import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import styles from './reset-password.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from 'react-redux';
import {
  isPasswordShort,
  MAX_PASSWORD_LENGTH,
  isPasswordEmpty,
  FORGOT_PASSWORD_URL,
} from '../utils/utils';
import { resetPasswordAction } from '../services/actions/passwordResetActions';
import Modal from '../components/modal/modal';
import { ResponseMessage } from '../components/resonse-message/response-message';

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation();

  const [form, setForm] = useState({ password: '', token: '' });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isResponseSuccessfull, setIsResponseSuccessfull] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = e => {
    const emailText = e.target.value;
    setForm({ ...form, [e.target.name]: emailText });
  };

  useEffect(() => {
    if (!isPasswordEmpty(form.password) && !isPasswordShort(form.password, MAX_PASSWORD_LENGTH)) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [form]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await dispatch(resetPasswordAction(form));
      if (response.success) {
        setIsResponseSuccessfull(true);
      }
    } catch (error) {
      setIsResponseSuccessfull(false);
      setResponseMessage(error.message);
    }
  };

  const handleModalClose = () => {
    setResponseMessage('');
    if (isResponseSuccessfull) {
      history.push('/login');
    }
    history.push('/forgot-password');
  };

  if (!state || (state.from && state.from !== FORGOT_PASSWORD_URL)) return <Redirect to='/' />;

  return (
    <>
      <form className={styles.container} method='POST' onSubmit={handleSubmit}>
        <h2 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h2>
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
            name='token'
            placeholder='Введите код из письма'
            value={form.token}
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
      </form>
      {responseMessage && (
        <Modal onClose={handleModalClose}>
          <ResponseMessage message={responseMessage} />
        </Modal>
      )}
    </>
  );
};
