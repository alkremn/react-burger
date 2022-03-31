import React, { useEffect, useRef, useState } from 'react';
import styles from './profile-details.module.css';

// components
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

const initialForm = {
  name: '',
  email: '',
  password: '',
};

export const ProfileDetails = () => {
  const { user } = useSelector(store => store.auth);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [disabledFields, setDisabledFields] = useState({
    name: true,
    email: true,
    password: true,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setForm({ ...initialForm, name: user.name, email: user.email });
    }
  }, [user]);

  const handleValidateInput = () => {};
  const handleInputChange = () => {};

  const handleNameIconClick = () => {
    setDisabledFields({ ...disabledFields, name: !disabledFields.name });
    if (nameRef.current) {
      nameRef.current.focus();
      console.log('asdf');
    }
  };

  const handleEmailIconClick = () => {
    setDisabledFields({ ...disabledFields, email: !disabledFields.email });
    if (emailRef.current) {
      emailRef.current.focus();
    }
  };

  const handlePasswordIconClick = () => {
    setDisabledFields({
      ...disabledFields,
      password: !disabledFields.password,
    });
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <Input
          ref={nameRef}
          type='text'
          name='name'
          placeholder='Имя'
          disabled={disabledFields.name}
          icon='EditIcon'
          value={form.name}
          onBlur={handleValidateInput}
          onChange={handleInputChange}
          onIconClick={handleNameIconClick}
          error={errors.email !== ''}
          errorText={errors.email}
        />
      </div>
      <div className={styles.inputContainer}>
        <Input
          ref={emailRef}
          type='text'
          name='email'
          placeholder='Логин'
          disabled={disabledFields.email}
          icon='EditIcon'
          value={form.email}
          onBlur={handleValidateInput}
          onChange={handleInputChange}
          onIconClick={handleEmailIconClick}
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
          icon='EditIcon'
          value={form.password}
          onBlur={handleValidateInput}
          onChange={handleInputChange}
          onIconClick={handlePasswordIconClick}
          error={errors.email !== ''}
          errorText={errors.email}
        />
      </div>
    </div>
  );
};
