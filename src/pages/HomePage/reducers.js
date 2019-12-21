import { fromJS } from 'immutable';
import ACTIONS from './actions';

export const initialState = fromJS({
  loading: {
    recommend: false,
    bestsell: false,
  },
  error: {
    recommend: '',
    bestsell: '',
  },
  recommendBooks: [],
  bestsellBooks: [],
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.FETCH_RECOMMEND_BOOKLIST:
      return state.setIn(['loading', 'recommend'], true);

    case ACTIONS.FETCH_RECOMMEND_BOOKLIST_SUCCESS:
      return state
        .setIn(['loading', 'recommend'], false)
        .setIn(['error', 'recommend'], '')
        .set('recommendBooks', fromJS(action.payload.data));

    case ACTIONS.FETCH_RECOMMEND_BOOKLIST_FAILURE:
      return state
        .setIn(['loading', 'recommend'], false)
        .setIn(['error', 'recommend'], action.payload.toString());

    case ACTIONS.FETCH_BESTSELL_BOOKLIST:
      return state.setIn(['loading', 'bestsell'], true);

    case ACTIONS.FETCH_BESTSELL_BOOKLIST_SUCCESS:
      return state
        .setIn(['loading', 'bestsell'], false)
        .setIn(['error', 'bestsell'], '')
        .set('bestsellBooks', fromJS(action.payload.data));

    case ACTIONS.FETCH_BESTSELL_BOOKLIST_FAILURE:
      return state
        .setIn(['loading', 'bestsell'], false)
        .setIn(['error', 'bestsell'], action.payload.toString());

    default:
      return state;
  }
}
