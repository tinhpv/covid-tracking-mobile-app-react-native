import React from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import reducers from './src/redux/reducers';
import AppNavigator from './src/navigation/AppNavigator';

const store = createStore(reducers, applyMiddleware(thunk));
export default () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};
