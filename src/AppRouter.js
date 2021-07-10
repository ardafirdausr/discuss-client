import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NotFound from './views/pages/NotFound';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact component={NotFound}/>
    </Switch>
  </Router>
)

export default AppRouter;