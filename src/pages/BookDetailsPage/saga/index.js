import { all, takeLatest, takeEvery } from 'redux-saga/effects';

import saga from '@sagas/commonSagas';
import { updateBookReviewSaga } from './sagas';
import notificationsHandler from '@sagas/notificationsHandler';

import ACTIONS from '../actions';
import UserReviewActions from '../containers/UserReview/actions';
import { fetchBookDetails, fetchBookReviews, faveBook, unfaveBook } from './api';

export default function* watchBookDetailsPage() {
  yield all([
    takeLatest(
      ACTIONS.FETCH_BOOK_DETAILS,
      saga,
      ACTIONS.FETCH_BOOK_DETAILS_SUCCESS,
      ACTIONS.FETCH_BOOK_DETAILS_FAILURE,
      fetchBookDetails,
    ),
    takeLatest(
      ACTIONS.FETCH_BOOK_REVIEWS,
      saga,
      ACTIONS.FETCH_BOOK_REVIEWS_SUCCESS,
      ACTIONS.FETCH_BOOK_REVIEWS_FAILURE,
      fetchBookReviews,
    ),
    takeEvery(
      [UserReviewActions.SUBMIT_USER_REVIEW_SUCCESS, UserReviewActions.UPDATE_USER_REVIEW_SUCCESS],
      updateBookReviewSaga,
      ACTIONS.FETCH_BOOK_REVIEWS,
      ACTIONS.FETCH_BOOK_DETAILS,
    ),
    takeLatest(
      ACTIONS.FAVE_BOOK,
      saga,
      ACTIONS.FAVE_BOOK_SUCCESS,
      ACTIONS.FAVE_BOOK_FAILURE,
      faveBook,
    ),
    takeLatest(
      ACTIONS.FAVE_BOOK_SUCCESS,
      notificationsHandler,
      'success',
      'Successfully Fave the book.',
    ),
    takeLatest(
      ACTIONS.FAVE_BOOK_FAILURE,
      notificationsHandler,
      'error',
      'Failed to Fave the book.',
    ),
    takeLatest(
      ACTIONS.UNFAVE_BOOK,
      saga,
      ACTIONS.UNFAVE_BOOK_SUCCESS,
      ACTIONS.UNFAVE_BOOK_FAILURE,
      unfaveBook,
    ),
    takeLatest(
      ACTIONS.UNFAVE_BOOK_SUCCESS,
      notificationsHandler,
      'success',
      'Successfully removed Faved book.',
    ),
    takeLatest(
      ACTIONS.FAVE_BOOK_FAILURE,
      notificationsHandler,
      'error',
      'Failed to remove Faved book.',
    ),
  ]);
}
