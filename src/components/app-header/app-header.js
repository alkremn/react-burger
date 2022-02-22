import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import headerStyles from './app-header.module.css';

export default function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <ul className={headerStyles.links}>
        <li>
          <a href='/'>
            <BurgerIcon type='secondary' />
            <p className='text text_type_main-default pl-2 text_color_inactive'>
              Конструктор
            </p>
          </a>
        </li>
        <li>
          <a href='/'>
            <ListIcon type='secondary' />
            <p className='text text_type_main-default pl-2 text_color_inactive'>
              Лента заказов
            </p>
          </a>
        </li>
        <li className={headerStyles.link_logo}>
          <a href='/'>
            <Logo />
          </a>
        </li>
        <li>
          <a href='/'>
            <ProfileIcon type='secondary' />
            <p className='text text_type_main-default pl-2 text_color_inactive'>
              Личный кабинет
            </p>
          </a>
        </li>
      </ul>
    </header>
  );
}
