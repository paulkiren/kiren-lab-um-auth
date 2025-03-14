import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store'; // Redux store
import AppNavigator from './navigation/AppNavigator'; // Navigation

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
