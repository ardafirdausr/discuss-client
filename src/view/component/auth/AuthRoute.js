import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { StoreContext } from '../../../store';

function AuthRoute(props) {
  let { state } = useContext(StoreContext)
  console.log('auth', state)
  return state.user
    ? <Route {...props} />
    : <Redirect to={{pathname: "/auth/login", state: { from: props.location }}} />
}

export default AuthRoute;
