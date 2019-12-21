import { fromJS } from 'immutable';
import ACTIONS from './actions';

export const initialState = fromJS({
  error: { search: '', autocomplete: '' },
  loading: { autocomplete: false, search: false },
  autocompleteResults: [],
  searchResults: [],
  selectedBook: {
    bookId: '',
    searchVal: '',
  },
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SEARCH_BOOKS:
      return state
        .set('selectedBook', fromJS(action.payload))
        .set('searchResults', fromJS([]))
        .setIn(['loading', 'search'], true);

    case ACTIONS.SEARCH_BOOKS_SUCCESS:
      return state
        .set('searchResults', fromJS(action.payload.data))
        .setIn(['loading', 'search'], false);

    case ACTIONS.SEARCH_BOOKS_FAILURE:
      return state
        .setIn(['error', 'search'], action.payload.toString())
        .setIn(['loading', 'search'], false);

    case ACTIONS.AUTOCOMPLETE_BOOKS:
      return state
        .set('autocompleteResults', fromJS([]))
        .set('searchResults', fromJS([]))
        .setIn(['selectedBook', 'searchVal'], action.payload.autocompleteVal)
        .setIn(['loading', 'autocomplete'], true);

    case ACTIONS.AUTOCOMPLETE_BOOKS_SUCCESS:
      return state
        .set('autocompleteResults', fromJS(action.payload.data))
        .setIn(['loading', 'autocomplete'], false);

    case ACTIONS.AUTOCOMPLETE_BOOKS_FAILURE:
      return state
        .setIn(['error', 'autocomplete'], action.payload.toString())
        .setIn(['loading', 'autocomplete'], false);

    default:
      return state;
  }
}
