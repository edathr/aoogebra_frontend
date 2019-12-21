const ACTIONS = {
  FETCH_BOOK_DETAILS: '@pages/BookDetailsPage/FETCH_BOOK_DETAILS',
  FETCH_BOOK_DETAILS_SUCCESS: '@pages/BookDetailsPage/FETCH_BOOK_DETAILS_SUCCESS',
  FETCH_BOOK_DETAILS_FAILURE: '@pages/BookDetailsPage/FETCH_BOOK_DETAILS_FAILURE',
  FETCH_BOOK_REVIEWS: '@pages/BookDetailsPage/FETCH_BOOK_REVIEWS',
  FETCH_BOOK_REVIEWS_SUCCESS: '@pages/BookDetailsPage/FETCH_BOOK_REVIEWS_SUCCESS',
  FETCH_BOOK_REVIEWS_FAILURE: '@pages/BookDetailsPage/FETCH_BOOK_REVIEWS_FAILURE',
  RESET_BOOK_REVIEWS: '@pages/BookDetailsPage/RESET_BOOK_REVIEWS',
  FAVE_BOOK: '@pages/BookDetailsPage/FAVE_BOOK',
  FAVE_BOOK_SUCCESS: '@pages/BookDetailsPage/FAVE_BOOK_SUCCESS',
  FAVE_BOOK_FAILURE: '@pages/BookDetailsPage/FAVE_BOOK_FAILURE',
  UNFAVE_BOOK: '@pages/BookDetailsPage/UNFAVE_BOOK',
  UNFAVE_BOOK_SUCCESS: '@pages/BookDetailsPage/UNFAVE_BOOK_SUCCESS',
  UNFAVE_BOOK_FAILURE: '@pages/BookDetailsPage/UNFAVE_BOOK_FAILURE',
};

export default ACTIONS;

export const fetchBookDetails = bookId => ({
  type: ACTIONS.FETCH_BOOK_DETAILS,
  payload: { bookId },
});

export const fetchBookReviews = (bookId, pageNum, pageSize) => ({
  type: ACTIONS.FETCH_BOOK_REVIEWS,
  payload: { bookId, pageNum, pageSize },
});

export const resetBookReviews = () => ({
  type: ACTIONS.RESET_BOOK_REVIEWS,
});

export const faveBook = bookId => ({
  type: ACTIONS.FAVE_BOOK,
  payload: { bookId },
});

export const unfaveBook = bookId => ({
  type: ACTIONS.UNFAVE_BOOK,
  payload: { bookId },
});
