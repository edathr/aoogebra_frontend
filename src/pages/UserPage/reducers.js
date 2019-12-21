import { fromJS } from 'immutable';
import ACTIONS from './actions';

export const initialState = fromJS({
  userDetails: {},
  favourite: [],
  booksReviewed: [],
  loading: false,
  error: '',
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.FETCH_USER_DETAILS:
      return state.set('loading', true);

    case ACTIONS.FETCH_USER_DETAILS_SUCCESS:
      return state
        .set('userDetails', fromJS(action.payload))
        .set('loading', false)
        .set('error', '');

    case ACTIONS.FETCH_USER_DETAILS_FAILURE:
      return state
        .set('userDetails', fromJS({}))
        .set('loading', false)
        .set('error', action.payload.toString());

    default:
      return state;
  }
}
