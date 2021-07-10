import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NotFound from './views/pages/NotFound';
import Login from './views/pages/Login';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/auth/login" component={Login}/>
      <Route exact path="/" component={Login}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
)

export default AppRouter;