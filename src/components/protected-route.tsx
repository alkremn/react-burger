import React, { ReactElement } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from './../utils/hooks';
interface Props {
  children?: ReactElement;
  path?: string;
  exact?: boolean;
}

export const ProtectedRoute = (props: Props) => {
  const { children, ...rest } = props;
  const { user } = useSelector(store => store.auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location.pathname } }} />
        )
      }
    />
  );
};
