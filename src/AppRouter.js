import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import GuestRoute from "./view/component/auth/GuestRoute";
import AuthRoute from "./view/component/auth/AuthRoute";
import NotFound from './view/page/NotFound';
import Login from './view/page/Login';
import Logout from './view/page/Logout';
import Chat from './view/page/Chat';

const AppRouter = () => (
  <Router>
    <Switch>
      <AuthRoute exact path="/chat" component={Chat} />
      <AuthRoute exact path="/chat/:discussionId" component={Chat} />
      <AuthRoute exact path="/auth/logout" component={Logout} />
      <GuestRoute exact path="/auth/login" component={Login} />
      <GuestRoute exact path="/" component={Login} />
      <Route component={NotFound}/>
    </Switch>
  </Router>
)

export default AppRouter;