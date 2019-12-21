import { all, takeLatest } from 'redux-saga/effects';

import saga from '@sagas/commonSagas';
import { logoutSuccessHandler } from './sagas';

import ACTIONS from '../actions';
import { loginFromStorage, logout, fetchGenres } from './api';

export default function* watcherAppLayout() {
  yield all([
    takeLatest(
      ACTIONS.LOGIN_FROM_STORAGE,
      saga,
      ACTIONS.LOGIN_FROM_STORAGE_SUCCESS,
      ACTIONS.LOGIN_FROM_STORAGE_FAILURE,
      loginFromStorage,
    ),
    takeLatest(ACTIONS.LOGOUT, saga, ACTIONS.LOGOUT_SUCCESS, ACTIONS.LOGOUT_FAILURE, logout),
    takeLatest(
      ACTIONS.FETCH_GENRES,
      saga,
      ACTIONS.FETCH_GENRES_SUCCESS,
      ACTIONS.FETCH_GENRES_FAILURE,
      fetchGenres,
    ),
    takeLatest(ACTIONS.LOGOUT_SUCCESS, logoutSuccessHandler),
  ]);
}
