import { select } from '@utils/selectorUtils';
import { initialState } from './reducers';

const selectAuthenticatePage = state => state.get('AuthenticatePage', initialState);

const selectLoading = select(selectAuthenticatePage, 'loading');

const selectError = select(selectAuthenticatePage, 'error');

export { selectLoading, selectError };
