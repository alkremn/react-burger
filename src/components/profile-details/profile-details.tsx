import React, { ChangeEvent, FocusEvent, FormEvent, useEffect, useRef, useState } from 'react';
import styles from './profile-details.module.css';

// components
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

// helper functions
import { validateEmail, WRONG_EMAIL_TITLE } from '../../utils/utils';

// actions
import { updateUserAction } from './../../services/actions/authActions';
import { useDispatch } from '../../utils/hooks';
import { useSelector } from './../../utils/hooks';
import { IRegisterForm } from '../../utils/types';

const initialForm: IRegisterForm = { name: '', email: '', password: '' };
const initialDisabledFields = { name: true, email: true, password: true };

export const ProfileDetails = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialForm);
  const [activeField, setActiveField] = useState('');
  const [disabledFields, setDisabledFields] = useState(initialDisabledFields);

  useEffect(() => {
    if (user) {
      setForm({ ...initialForm, name: user.name, email: user.email });
    }
  }, [user]);

  useEffect(() => {
    switch (activeField) {
      case 'name':
        if (nameRef.current) {
          nameRef.current.focus();
        }
        break;
      case 'email':
        if (emailRef.current) {
          emailRef.current.focus();
        }
        break;
      case 'password':
        if (passwordRef.current) {
          passwordRef.current.focus();
        }
        break;
      default:
    }
  }, [activeField]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleValidateInput = (e: FocusEvent<HTMLInputElement>) => {
    const emailText = e.target.value;
    if (e.target.name === 'email') {
      if (!validateEmail(emailText)) {
        setErrors({ ...errors, email: WRONG_EMAIL_TITLE });
      } else {
        setErrors({ ...errors, email: '' });
      }
    }
  };

  const handleEditModeIconClick = (title: string) => {
    setDisabledFields({ ...initialDisabledFields, [title]: false });
    setActiveField(title);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedForm = Object.assign(
      {},
      user?.name === form.name ? { name: form.name } : undefined,
      user?.email === form.email ? { email: form.email } : undefined,
      form.password === '' ? null : { password: form.password }
    );

    dispatch(updateUserAction(updatedForm));
    setDisabledFields(initialDisabledFields);
    setActiveField('');
  };

  const handleCancelClick = () => {
    setDisabledFields(initialDisabledFields);
    setForm({ ...initialForm, name: user?.name, email: user?.email });
    setActiveField('');
  };

  return (
    <form className={styles.container} onSubmit={handleFormSubmit}>
      <div className={styles.inputContainer}>
        <Input
          ref={nameRef}
          type='text'
          name='name'
          placeholder='Имя'
          disabled={disabledFields.name}
          icon={activeField === 'name' ? 'CloseIcon' : 'EditIcon'}
          value={form.name ?? ''}
          onBlur={handleValidateInput}
          onChange={handleInputChange}
          onIconClick={() => handleEditModeIconClick('name')}
          error={errors.name !== ''}
          errorText={errors.name}
        />
      </div>
      <div className={styles.inputContainer}>
        <Input
          ref={emailRef}
          type='text'
          name='email'
          placeholder='Логин'
          disabled={disabledFields.email}
          icon={activeField === 'email' ? 'CloseIcon' : 'EditIcon'}
          value={form.email ?? ''}
          onBlur={handleValidateInput}
          onChange={handleInputChange}
          onIconClick={() => handleEditModeIconClick('email')}
          error={errors.email !== ''}
          errorText={errors.email}
        />
      </div>
      <div className={styles.inputContainer}>
        <Input
          ref={passwordRef}
          type='password'
          name='password'
          placeholder='Пароль'
          disabled={disabledFields.password}
          icon={activeField === 'password' ? 'CloseIcon' : 'EditIcon'}
          value={form.password ?? ''}
          onBlur={handleValidateInput}
          onChange={handleInputChange}
          onIconClick={() => handleEditModeIconClick('password')}
          error={errors.password !== ''}
          errorText={errors.password}
        />
      </div>
      {activeField !== '' && (
        <div className={styles.bottomContainer}>
          <Button type='primary' size='medium' htmlType='submit'>
            Сохранить
          </Button>
          <button className={styles.cancelButton} onClick={handleCancelClick}>
            <span className='text text_type_main-default'>Отмена</span>
          </button>
        </div>
      )}
    </form>
  );
};
