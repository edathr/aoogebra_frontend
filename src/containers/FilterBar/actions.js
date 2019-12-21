const ACTIONS = {
  SEARCH_BOOKS: '@containers/FilterBar/SEARCH_BOOKS',
  SEARCH_BOOKS_SUCCESS: '@containers/FilterBar/SEARCH_BOOKS_SUCCESS',
  SEARCH_BOOKS_FAILURE: '@containers/FilterBar/SEARCH_BOOKS_FAILURE',
  AUTOCOMPLETE_BOOKS: '@containers/FilterBar/AUTOCOMPLETE_BOOKS',
  AUTOCOMPLETE_BOOKS_SUCCESS: '@containers/FilterBar/AUTOCOMPLETE_BOOKS_SUCCESS',
  AUTOCOMPLETE_BOOKS_FAILURE: '@containers/FilterBar/AUTOCOMPLETE_BOOKS_FAILURE',
};

export default ACTIONS;

export const searchBooks = (bookId, searchVal) => ({
  type: ACTIONS.SEARCH_BOOKS,
  payload: { bookId, searchVal },
});

export const autocompleteBooks = autocompleteVal => ({
  type: ACTIONS.AUTOCOMPLETE_BOOKS,
  payload: { autocompleteVal },
});
