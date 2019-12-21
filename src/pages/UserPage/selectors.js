import { select, selectToJS } from '@utils/selectorUtils';
import { initialState } from './reducers';

const selectUserPage = state => state.get('UserPage', initialState);

const selectUserDetails = selectToJS(selectUserPage, 'userDetails');

const selectLoading = select(selectUserPage, 'loading');

const selectError = select(selectUserPage, 'error');

export { selectUserDetails, selectLoading, selectError };
