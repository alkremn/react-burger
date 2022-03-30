import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import headerStyles from './app-header.module.css';

const defaultState = {
  constructor: false,
  orders: false,
  profile: false,
};

export default function AppHeader() {
  const [activeLink, setActiveLink] = useState('constructor');
  const [state, setState] = useState({ ...defaultState, [activeLink]: true });

  const handleLinkClick = name => {
    setState({ ...defaultState, [name]: true });
    setActiveLink(name);
  };

  const handleMouseEnter = name => {
    setState({ ...state, [name]: true });
  };
  const handleMouseLeave = name => {
    if (state[name] && activeLink !== name) {
      setState({ ...state, [name]: false });
    }
  };

  return (
    <header className={headerStyles.header}>
      <ul className={headerStyles.links}>
        <li className={headerStyles.listItem}>
          <NavLink
            to='/'
            onMouseEnter={() => handleMouseEnter('constructor')}
            onMouseLeave={() => handleMouseLeave('constructor')}
            onClick={() => handleLinkClick('constructor')}
          >
            <BurgerIcon
              type={`${state.constructor ? 'primary' : 'secondary'}`}
            />
            <p
              className={`text text_type_main-default pl-2 ${
                state.constructor ? 'text_color_active' : 'text_color_inactive'
              }`}
            >
              Конструктор
            </p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/orders'
            onMouseEnter={() => handleMouseEnter('orders')}
            onMouseLeave={() => handleMouseLeave('orders')}
            onClick={() => handleLinkClick('orders')}
          >
            <ListIcon type={`${state.orders ? 'primary' : 'secondary'}`} />
            <p
              className={`text text_type_main-default pl-2 ${
                state.orders ? 'text_color_active' : 'text_color_inactive'
              }`}
            >
              Лента заказов
            </p>
          </NavLink>
        </li>
        <li className={headerStyles.link_logo}>
          <NavLink to='/' onClick={() => handleLinkClick('constructor')}>
            <Logo />
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/profile/details'
            onMouseEnter={() => handleMouseEnter('profile')}
            onMouseLeave={() => handleMouseLeave('profile')}
            onClick={() => handleLinkClick('profile')}
          >
            <ProfileIcon type={`${state.profile ? 'primary' : 'secondary'}`} />
            <p
              className={`text text_type_main-default pl-2 ${
                state.profile ? 'text_color_active' : 'text_color_inactive'
              }`}
            >
              Личный кабинет
            </p>
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
