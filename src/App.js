import AppRouter from './AppRouter';

import Store from './store';

const App = () => (
  <Store>
    <AppRouter />
  </Store>
);

export default App;
