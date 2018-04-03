import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

const store = createStore(reducers);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers');
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
