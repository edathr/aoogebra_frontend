import { fromJS } from 'immutable';
import ACTIONS from './actions';

export const initialState = fromJS({
  loading: {
    favourite: false,
    myReviews: false,
  },
  error: {
    favourite: '',
    myReviews: '',
  },
  favourite: [],
  myReviews: {},
  totalReviewCount: 0,
  currentReviewPageNum: 0,
  pageSize: 8,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.FETCH_FAVOURITE:
      return state.setIn(['loading', 'favourite'], true);

    case ACTIONS.FETCH_FAVOURITE_SUCCESS:
      return state
        .set('favourite', fromJS(action.payload.books_favourite))
        .setIn(['loading', 'favourite'], false)
        .setIn(['error', 'favourite'], '');

    case ACTIONS.FETCH_FAVOURITE_FAILURE:
      return state
        .setIn(['loading', 'favourite'], false)
        .setIn(['error', 'favourite'], action.payload.toString());

    case ACTIONS.FETCH_MY_REVIEWS:
      return state
        .setIn(['loading', 'myReviews'], true)
        .set('currentReviewPageNum', action.payload.pageNum);

    case ACTIONS.FETCH_MY_REVIEWS_SUCCESS:
      return state
        .setIn(['myReviews', action.payload.pageNum], fromJS(action.payload.data.reviews))
        .set('totalReviewCount', action.payload.data.num_reviews || 0)
        .setIn(['loading', 'myReviews'], false)
        .setIn(['error', 'myReviews'], '');

    case ACTIONS.FETCH_MY_REVIEWS_FAILURE:
      return state.setIn(['loading', 'myReviews'], false);

    default:
      return state;
  }
}
