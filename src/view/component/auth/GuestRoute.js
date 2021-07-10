import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { StoreContext } from '../../../store';

function GuestRoute(props) {
  let { state } = useContext(StoreContext)
  console.log('guest', !state.user)
  return !state.user
    ? <Route {...props} />
    : <Redirect to={{pathname: "/chat", state: { from: props.location }}} />
}

export default GuestRoute;
