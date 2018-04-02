import { createStore, applyMiddleware } from 'redux';
//import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
//import sagas from './sagas';

//const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers
  //applyMiddleware(sagaMiddleware)
);

//sagaMiddleware.run(sagas);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers');
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
