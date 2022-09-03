import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import headerStyles from './app-header.module.css';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';

interface IState {
  [name: string]: boolean;
}

const defaultState = {
  constructor: false,
  feed: false,
  profile: false,
};

export default function AppHeader() {
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState<string>(pathname);
  const [state, setState] = useState<IState>({ ...defaultState, [activeLink]: true });

  useEffect(() => {
    if (pathname === '/') {
      setActiveLink('constructor');
      setState({ ...defaultState, constructor: true });
    } else {
      setActiveLink(pathname.slice(1));
      setState({ ...defaultState, [pathname.slice(1)]: true });
    }
  }, [pathname]);

  const handleLinkClick = (name: string) => {
    setState({ ...defaultState, [name]: true });
    setActiveLink(name);
  };

  const handleMouseEnter = (name: string) => {
    setState({ ...state, [name]: true });
  };
  const handleMouseLeave = (name: string) => {
    if (state[name] && activeLink !== name) {
      setState({ ...state, [name]: false });
    }
  };

  return (
    <header className={headerStyles.header}>
      <ul className={headerStyles.links}>
        <div className={headerStyles.mainLinks}>
          <li className={headerStyles.listItem}>
            <NavLink
              to='/'
              onMouseEnter={() => handleMouseEnter('constructor')}
              onMouseLeave={() => handleMouseLeave('constructor')}
              onClick={() => handleLinkClick('constructor')}
            >
              <BurgerIcon type={`${state.constructor ? 'primary' : 'secondary'}`} />
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
              to='/feed'
              onMouseEnter={() => handleMouseEnter('feed')}
              onMouseLeave={() => handleMouseLeave('feed')}
              onClick={() => handleLinkClick('feed')}
            >
              <ListIcon type={`${state.feed ? 'primary' : 'secondary'}`} />
              <p
                className={`text text_type_main-default pl-2 ${
                  state.feed ? 'text_color_active' : 'text_color_inactive'
                }`}
              >
                Лента заказов
              </p>
            </NavLink>
          </li>
        </div>
        <li className={headerStyles.link_logo}>
          <NavLink to='/' onClick={() => handleLinkClick('constructor')}>
            <Logo />
          </NavLink>
        </li>
        <li className={headerStyles.profileLink}>
          <NavLink
            to='/profile'
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
