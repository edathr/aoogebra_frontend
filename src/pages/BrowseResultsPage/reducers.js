import { fromJS } from 'immutable';
import ACTIONS from './actions';

export const initialState = fromJS({
  books: {},
  totalCount: 0,
  pageSize: 8,
  pageNum: 0,
  loading: false,
  error: '',
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.FETCH_BOOKS_GENRE:
      return state.set('pageNum', action.payload.pageNum).set('loading', true);

    case ACTIONS.FETCH_BOOKS_GENRE_SUCCESS:
      return state
        .setIn(['books', action.payload.pageNum], fromJS(action.payload.data.books))
        .set('totalCount', action.payload.data.num_books)
        .set('loading', false)
        .set('error', '');

    case ACTIONS.FETCH_BOOKS_GENRE_FAILURE:
      return state.set('loading', false).set('error', action.payload.toString());

    default:
      return state;
  }
}
