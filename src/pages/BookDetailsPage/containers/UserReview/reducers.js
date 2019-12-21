import { fromJS } from 'immutable';
import ACTIONS from './actions';

export const initialState = fromJS({
  loading: false,
  error: '',
  review: {},
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.FETCH_USER_REVIEW:
    case ACTIONS.UPDATE_USER_REVIEW:
    case ACTIONS.SUBMIT_USER_REVIEW:
      return state.set('loading', true);

    case ACTIONS.FETCH_USER_REVIEW_SUCCESS:
      return state
        .set('review', fromJS(action.payload.data))
        .set('loading', false)
        .set('error', '');

    case ACTIONS.FETCH_USER_REVIEW_FAILURE:
      return state
        .set('review', fromJS({}))
        .set('loading', false)
        .set('error', action.payload.toString());

    case ACTIONS.SUBMIT_USER_REVIEW_SUCCESS:
      return state
        .set('review', fromJS(action.payload.data))
        .set('loading', false)
        .set('error', '');

    case ACTIONS.UPDATE_USER_REVIEW_SUCCESS:
      return state
        .set('review', fromJS(action.payload.data))
        .set('loading', false)
        .set('error', '');

    case ACTIONS.UPDATE_USER_REVIEW_FAILURE:
    case ACTIONS.SUBMIT_USER_REVIEW_FAILURE:
      return state.set('loading', false).set('error', action.payload.toString());

    default:
      return state;
  }
}
