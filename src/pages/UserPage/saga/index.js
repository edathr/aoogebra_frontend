import { all, takeLatest } from 'redux-saga/effects';

import saga from '@sagas/commonSagas';

import ACTIONS from '../actions';
import { fetchUserDetails } from './api';

export default function* watcherUserPage() {
  yield all([
    takeLatest(
      ACTIONS.FETCH_USER_DETAILS,
      saga,
      ACTIONS.FETCH_USER_DETAILS_SUCCESS,
      ACTIONS.FETCH_USER_DETAILS_FAILURE,
      fetchUserDetails,
    ),
  ]);
}
