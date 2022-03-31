import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './profile.module.css';

export const ProfilePage = () => {
  const [isProfileActive, setIsProfileActive] = useState(true);

  const handleLogout = e => {
    console.log(e);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <ul className={styles.menu}>
          <li className={styles.link}>
            <NavLink
              to='/profile'
              end
              onClick={() => setIsProfileActive(true)}
              className={({ isActive }) =>
                'text text_type_main-medium ' +
                (isActive ? styles.linkActive : styles.link)
              }
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/profile/orders'
              onClick={() => setIsProfileActive(false)}
              className={({ isActive }) =>
                'text text_type_main-medium ' +
                (isActive ? styles.linkActive : styles.link)
              }
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <button
              className={`text text_type_main-medium ${styles.logoutButton}`}
              onClick={handleLogout}
            >
              Выход
            </button>
          </li>
        </ul>
        <Outlet />
      </div>
      {isProfileActive && (
        <p className={`text text_type_main-default ${styles.text}`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      )}
    </div>
  );
};
