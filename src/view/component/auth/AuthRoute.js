import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { StoreContext } from '../../../store';
import { getUser } from '../../../store/user/selector';


function AuthRoute(props) {
  let { state } = useContext(StoreContext);
  let user = getUser(state);
  return user
    ? <Route {...props} />
    : <Redirect to={{pathname: "/auth/login", state: { from: props.location }}} />
}

export default AuthRoute;
