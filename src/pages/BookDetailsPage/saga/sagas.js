import { all, put, select } from 'redux-saga/effects';

export function* updateBookReviewSaga(bookReviewAction, bookDetailsAction) {
  const bookReviewPayload = yield select(state => {
    const currentState = state.get('BookDetailsPage');
    return {
      bookId: currentState.getIn(['book', 'asin']),
      pageNum: currentState.get('currentReviewPageNum'),
      pageSize: currentState.get('pageSize'),
    };
  });

  yield all([
    put({
      type: bookReviewAction,
      payload: bookReviewPayload,
    }),
    put({
      type: bookDetailsAction,
      payload: { bookId: bookReviewPayload.bookId },
    }),
  ]);
}
