import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router';
import history from '@utils/core/history';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
