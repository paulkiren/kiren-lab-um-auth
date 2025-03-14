import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import store from './store/store'; // Redux store
import AppNavigator from './navigation/AppNavigator'; // Navigation
import ErrorBoundary from './components/ErrorBoundary'; // Error Boundary
import theme from './theme'; // Theme
import Loading from './components/Loading';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <AppNavigator />
            </Suspense>
          </ErrorBoundary>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
