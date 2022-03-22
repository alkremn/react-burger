import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { NavLink } from 'react-router-dom';
import headerStyles from './app-header.module.css';

export default function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <ul className={headerStyles.links}>
        <li>
          <NavLink to='/'>
            <BurgerIcon type='primary' />
            <p className='text text_type_main-default pl-2'>Конструктор</p>
          </NavLink>
        </li>
        <li>
          <NavLink to='/orders'>
            <ListIcon type='secondary' />
            <p className='text text_type_main-default pl-2 text_color_inactive'>
              Лента заказов
            </p>
          </NavLink>
        </li>
        <li className={headerStyles.link_logo}>
          <NavLink to='/'>
            <Logo />
          </NavLink>
        </li>
        <li>
          <NavLink to='/profile'>
            <ProfileIcon type='secondary' />
            <p className='text text_type_main-default pl-2 text_color_inactive'>
              Личный кабинет
            </p>
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
