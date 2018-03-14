import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';

import history from './history';
import { rootSaga, reducers } from '../modules/root';

const DEV = process.env.NODE_ENV === 'development';

/*
* Middleware & enhancers
*/
const middleware = [];
middleware.push(routerMiddleware(history));

// middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

// middleware: Redux Logger
if (DEV) {
  middleware.push(createLogger({ collapsed: true }));
}

const enhancers = [];
enhancers.push(applyMiddleware(...middleware));

// enhancer: Redux DevTools
if (DEV) {
  enhancers.push(window.devToolsExtension ? window.devToolsExtension() : f => f);
}

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  compose(...enhancers)
);

sagaMiddleware.run(rootSaga);

export default store;