import React from 'react';
import {Provider} from 'react-redux';
import store from './store/index';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './routes';
import {StoreContext} from './store/Context/index';

const App = () => {
  return (
    <Provider store={store}>
      <StoreContext>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </StoreContext>
    </Provider>
  );
};

export default App;
