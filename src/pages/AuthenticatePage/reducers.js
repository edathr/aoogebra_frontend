import { fromJS } from 'immutable';
import ACTIONS from './actions';

export const initialState = fromJS({
  loading: false,
  error: '',
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SIGNIN_FROM_API:
    case ACTIONS.SIGNUP_FROM_API:
      return state.set('loading', true);

    case ACTIONS.SIGNIN_FROM_API_SUCCESS:
      return state.set('loading', false);

    case ACTIONS.SIGNIN_FROM_API_FAILURE:
      return state.set('loading', false).set('error', action.payload.toString());

    case ACTIONS.SIGNUP_FROM_API_SUCCESS:
      return state.set('loading', false);

    case ACTIONS.SIGNUP_FROM_API_FAILURE:
      return state.set('loading', false).set('error', action.payload.toString());

    default:
      return state;
  }
}
