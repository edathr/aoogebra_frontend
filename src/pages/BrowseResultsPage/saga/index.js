import { all, takeLatest } from 'redux-saga/effects';

import saga from '@sagas/commonSagas';

import ACTIONS from '../actions';

import { fetchBooksGenre } from './api';

export default function* watcherBrowseResultsPage() {
  yield all([
    takeLatest(
      ACTIONS.FETCH_BOOKS_GENRE,
      saga,
      ACTIONS.FETCH_BOOKS_GENRE_SUCCESS,
      ACTIONS.FETCH_BOOKS_GENRE_FAILURE,
      fetchBooksGenre,
    ),
  ]);
}
