import { all, takeLatest } from 'redux-saga/effects';

import saga from '@sagas/commonSagas';

import ACTIONS from '../actions';
import { fetchRecommendBookList, fetchBestsellBookList } from './api';

export default function* watcherHome() {
  yield all([
    takeLatest(
      ACTIONS.FETCH_RECOMMEND_BOOKLIST,
      saga,
      ACTIONS.FETCH_RECOMMEND_BOOKLIST_SUCCESS,
      ACTIONS.FETCH_RECOMMEND_BOOKLIST_FAILURE,
      fetchRecommendBookList,
    ),
    takeLatest(
      ACTIONS.FETCH_BESTSELL_BOOKLIST,
      saga,
      ACTIONS.FETCH_BESTSELL_BOOKLIST_SUCCESS,
      ACTIONS.FETCH_BESTSELL_BOOKLIST_FAILURE,
      fetchBestsellBookList,
    ),
  ]);
}
