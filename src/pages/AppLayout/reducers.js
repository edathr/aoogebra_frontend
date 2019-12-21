import { fromJS } from 'immutable';
import ACTIONS from './actions';

export const initialState = fromJS({
  user: {},
  loading: false,
  error: '',
  genres: [],
  prevPath: '',
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOGIN_FROM_STORAGE:
      return state.set('loading', true);

    case ACTIONS.LOGIN_FROM_STORAGE_SUCCESS:
      return state.set('user', fromJS(action.payload)).set('loading', false);

    case ACTIONS.LOGIN_FROM_STORAGE_FAILURE:
      return state.set('loading', false).set('user', fromJS({}));

    case ACTIONS.FETCH_GENRES_SUCCESS:
      return state.set('genres', fromJS(action.payload.data));

    case ACTIONS.LOGOUT_SUCCESS:
      return state.set('user', fromJS({}));

    case ACTIONS.LOAD_PREV_PATH:
      return state.set('prevPath', action.payload);

    case ACTIONS.CLEAR_PREV_PATH:
      return state.set('prevPath', '');

    default:
      return state;
  }
}
