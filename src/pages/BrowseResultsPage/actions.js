const ACTIONS = {
  FETCH_BOOKS_GENRE: '@pages/BrowseResultsPage/FETCH_BOOKS_GENRE',
  FETCH_BOOKS_GENRE_SUCCESS: '@pages/BrowseResultsPage/FETCH_BOOKS_GENRE_SUCCESS',
  FETCH_BOOKS_GENRE_FAILURE: '@pages/BrowseResultsPage/FETCH_BOOKS_GENRE_FAILURE',
};

export default ACTIONS;

export const fetchBooksGenre = (genre, pageNum, pageSize) => ({
  type: ACTIONS.FETCH_BOOKS_GENRE,
  payload: { genre, pageNum, pageSize },
});
