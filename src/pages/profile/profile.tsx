import React, { MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Switch, useRouteMatch } from 'react-router-dom';
import { logoutAction } from '../../services/actions/authActions';
import styles from './profile.module.css';
import { ProtectedRoute } from '../../components/protected-route';
import { ProfileDetails } from '../../components/profile-details/profile-details';
import { OrderHistory } from '../../components/order-history/order-history';
import { OrderPage } from '../order/order';

interface IProfilePageProps {
  onClosePopup: () => void;
}

export const ProfilePage = ({ onClosePopup }: IProfilePageProps) => {
  const dispatch = useDispatch();
  const { path, url } = useRouteMatch();

  const [isProfileActive, setIsProfileActive] = useState(true);

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(logoutAction());
  };

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <ul className={styles.menu}>
          <li className={styles.link}>
            <NavLink
              to={`${url}`}
              exact
              onClick={() => setIsProfileActive(true)}
              className={`text text_type_main-medium ${styles.link}`}
              activeClassName={`text text_type_main-medium ${styles.linkActive}`}
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/orders`}
              onClick={() => setIsProfileActive(false)}
              className={`text text_type_main-medium ${styles.link}`}
              activeClassName={`text text_type_main-medium ${styles.linkActive}`}
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
        <Switch>
          <ProtectedRoute path={`${path}/`} exact={true}>
            <ProfileDetails />
          </ProtectedRoute>
          <ProtectedRoute path={`${path}/orders`}>
            <OrderHistory />
          </ProtectedRoute>
          <ProtectedRoute path={`${path}/orders/:id`}>
            <OrderPage />
          </ProtectedRoute>
        </Switch>
      </div>
      {isProfileActive && (
        <p className={`text text_type_main-default ${styles.text}`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      )}
    </div>
  );
};
