import { all, takeLatest } from 'redux-saga/effects';

import saga from '@sagas/commonSagas';

import ACTIONS from '../actions';

import { fetchFavourite, fetchMyReviews } from './api';

export default function* watcherHome() {
  yield all([
    takeLatest(
      ACTIONS.FETCH_FAVOURITE,
      saga,
      ACTIONS.FETCH_FAVOURITE_SUCCESS,
      ACTIONS.FETCH_FAVOURITE_FAILURE,
      fetchFavourite,
    ),
    takeLatest(
      ACTIONS.FETCH_MY_REVIEWS,
      saga,
      ACTIONS.FETCH_MY_REVIEWS_SUCCESS,
      ACTIONS.FETCH_MY_REVIEWS_FAILURE,
      fetchMyReviews,
    ),
  ]);
}
