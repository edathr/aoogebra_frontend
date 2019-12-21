import { all, takeLatest } from 'redux-saga/effects';

import saga from '@sagas/commonSagas';

import ACTIONS from '../actions';
import { searchBooks, autocompleteBooks } from './api';

export default function* watcherFilterBar() {
  yield all([
    takeLatest(
      ACTIONS.SEARCH_BOOKS,
      saga,
      ACTIONS.SEARCH_BOOKS_SUCCESS,
      ACTIONS.SEARCH_BOOKS_FAILURE,
      searchBooks,
    ),
    takeLatest(
      ACTIONS.AUTOCOMPLETE_BOOKS,
      saga,
      ACTIONS.AUTOCOMPLETE_BOOKS_SUCCESS,
      ACTIONS.AUTOCOMPLETE_BOOKS_FAILURE,
      autocompleteBooks,
    ),
  ]);
}
