import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './forgot-password.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { validateEmail } from '../../utils/utils';
import { useDispatch } from '../../utils/hooks';

// actions
import { resetPasswordRequestAction } from '../../services/actions/passwordResetActions';
import Modal from '../../components/modal/modal';
import { ResponseMessage } from '../../components/resonse-message/response-message';

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();

  const [email, setEmail] = useState('');

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isResponseSuccessfull, setIsResponseSuccessfull] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const emailText = e.target.value;
    setEmail(emailText);

    const isValid = validateEmail(emailText);
    setIsValid(isValid);

    if (isValid) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await dispatch(resetPasswordRequestAction(email));
      if (response) {
        setIsResponseSuccessfull(true);
        setResponseMessage(response.message);
      }
    } catch (error) {
      setResponseMessage(error.message);
    }
  };

  const handleModalClose = () => {
    setResponseMessage('');
    if (isResponseSuccessfull) {
      history.push({ pathname: '/reset-password', state: { from: pathname } });
    }
  };

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h2 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h2>
        <div className={styles.inputContainer}>
          <Input
            name='email'
            type='email'
            placeholder='Укажите e-mail'
            value={email}
            error={!isValid}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.ButtonContainer}>
          <Button type='primary' size='medium' disabled={!isActive}>
            Восстановить
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
