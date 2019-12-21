const ACTIONS = {
  FETCH_FAVOURITE: '@pages/MyBookPage/FETCH_FAVOURITE',
  FETCH_FAVOURITE_SUCCESS: '@pages/MyBookPage/FETCH_FAVOURITE_SUCCESS',
  FETCH_FAVOURITE_FAILURE: '@pages/MyBookPage/FETCH_FAVOURITE_FAILURE',
  FETCH_MY_REVIEWS: '@pages/MyBookPage/FETCH_MY_REVIEWS',
  FETCH_MY_REVIEWS_SUCCESS: '@pages/MyBookPage/FETCH_MY_REVIEWS_SUCCESS',
  FETCH_MY_REVIEWS_FAILURE: '@pages/MyBookPage/FETCH_MY_REVIEWS_FAILURE',
};

export default ACTIONS;

export const fetchFavourite = username => ({
  type: ACTIONS.FETCH_FAVOURITE,
  payload: { username },
});

export const fetchMyReviews = (username, pageNum, pageSize) => ({
  type: ACTIONS.FETCH_MY_REVIEWS,
  payload: { username, pageNum, pageSize },
});
