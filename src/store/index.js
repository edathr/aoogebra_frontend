import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'connected-react-router';
import freeze from 'redux-freeze';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import createReducer from '@pages/rootReducer';
import { log } from '@utils/logger';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const loggerOptions = {};
  const loggerMiddleware = createLogger(loggerOptions);

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(freeze);
    middlewares.push(loggerMiddleware);
  }

  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;

  const store = createStore(createReducer(), fromJS(initialState), composeEnhancers(...enhancers));

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {};
  store.injectedSagas = {};
  store.dispatch = addLoggingToDispatch(store);

  return store;
}

const addLoggingToDispatch = store => {
  const rawDispatch = store.dispatch;

  return action => {
    log('info', { action });
    return rawDispatch(action);
  };
};
