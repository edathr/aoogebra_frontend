const ACTIONS = {
  FETCH_USER_REVIEW: '@pages/BookDetailsPage/UserReview/FETCH_USER_REVIEW',
  FETCH_USER_REVIEW_SUCCESS: '@pages/BookDetailsPage/UserReview/FETCH_USER_REVIEW_SUCCESS',
  FETCH_USER_REVIEW_FAILURE: '@pages/BookDetailsPage/UserReview/FETCH_USER_REVIEW_FAILURE',
  UPDATE_USER_REVIEW: '@pages/BookDetailsPage/UserReview/UPDATE_USER_REVIEW',
  UPDATE_USER_REVIEW_SUCCESS: '@pages/BookDetailsPage/UserReview/UPDATE_USER_REVIEW_SUCCESS',
  UPDATE_USER_REVIEW_FAILURE: '@pages/BookDetailsPage/UserReview/UPDATE_USER_REVIEW_FAILURE',
  SUBMIT_USER_REVIEW: '@pages/BookDetailsPage/UserReview/SUBMIT_USER_REVIEW',
  SUBMIT_USER_REVIEW_SUCCESS: '@pages/BookDetailsPage/UserReview/SUBMIT_USER_REVIEW_SUCCESS',
  SUBMIT_USER_REVIEW_FAILURE: '@pages/BookDetailsPage/UserReview/SUBMIT_USER_REVIEW_FAILURE',
};

export default ACTIONS;

export const fetchUserReview = (bookId, username) => ({
  type: ACTIONS.FETCH_USER_REVIEW,
  payload: { bookId, username },
});

export const updateUserReview = (bookId, rating, review) => ({
  type: ACTIONS.UPDATE_USER_REVIEW,
  payload: { bookId, rating, review },
});

export const submitUserReview = (bookId, rating, review) => ({
  type: ACTIONS.SUBMIT_USER_REVIEW,
  payload: { bookId, rating, review },
});
