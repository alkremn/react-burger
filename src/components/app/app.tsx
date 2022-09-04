import React, { useEffect, useState } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import styles from './app.module.css';
import { IMainStore } from '../../utils/types';
import { Location } from 'history';

// components
import AppHeader from './../app-header/app-header';
import { ProtectedRoute } from './../protected-route';
import {
  LoginPage,
  RegisterPage,
  ConstructorPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
  NotFoundPage,
} from '../../pages/index';
import { Loader } from '../loader/loader';
import {
  fetchIngredientsAction,
  removeDetailedIngredient,
} from '../../services/actions/ingredientsActions';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from './../../utils/hooks';
import { FeedPage } from '../../pages/feed/feed';
import { OrderPage } from '../../pages/order/order';
import { OrderSummary } from '../order-summary/order-summary';
declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

function App() {
  const { isLoading } = useSelector((store: IMainStore) => store.async);
  const { ingredients } = useSelector((store: IMainStore) => store.ingredients);
  const { order } = useSelector((store: IMainStore) => store.order);

  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation<{ background?: Location<{} | null | undefined> }>();
  const history = useHistory();

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredientsAction());
    }
  }, [ingredients, dispatch]);

  useEffect(() => {
    if (order) {
      setIsVisible(true);
    }
  }, [order]);

  const handleClosePopup = () => {
    const path = location.pathname.split('/').slice(1, -1).join('/');
    history.push(`/${path === 'ingredients' ? '' : path}`);
    dispatch(removeDetailedIngredient());
  };
  const handleOrderDetailsClose = () => {
    setIsVisible(false);
  };

  const background = location.state?.background;

  return (
    <>
      {isLoading && <Loader />}
      <AppHeader />
      <main className={styles.page}>
        <div className={styles.mainContainer}>
          <Switch location={background || location}>
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/forgot-password' component={ForgotPasswordPage} />
            <Route path='/reset-password' component={ResetPasswordPage} />
            <Route path='/feed' exact={true} component={FeedPage} />
            <Route path='/feed/:id' children={<OrderPage />} />
            <Route path='/' exact={true}>
              <ConstructorPage />
            </Route>
            <Route path='/ingredients/:id' children={<IngredientPage />} />
            <ProtectedRoute path='/profile'>
              <ProfilePage onClosePopup={handleClosePopup} />
            </ProtectedRoute>
            <Route path='*' component={NotFoundPage} />
          </Switch>
        </div>
        {background && (
          <>
            <Route
              path='/ingredients/:id'
              children={
                <Modal onClose={handleClosePopup}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/feed/:id'
              children={
                <Modal onClose={handleClosePopup}>
                  <OrderSummary />
                </Modal>
              }
            />
            <ProtectedRoute path={`/profile/orders/:id`}>
              <Route
                path={`/profile/orders/:id`}
                children={
                  <Modal onClose={handleClosePopup}>
                    <OrderSummary />
                  </Modal>
                }
              />
            </ProtectedRoute>
          </>
        )}
        {isVisible && (
          <Modal onClose={handleOrderDetailsClose}>
            <OrderDetails />
          </Modal>
        )}
      </main>
    </>
  );
}

export default App;
