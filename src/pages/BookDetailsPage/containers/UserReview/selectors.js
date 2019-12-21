import { select, selectToJS } from '@utils/selectorUtils';
import { initialState } from './reducers';

const selectUserReview = state => state.get('BookDetailsPage.UserReview', initialState);

const selectLoading = select(selectUserReview, 'loading');

const selectError = select(selectUserReview, 'error');

const selectReview = selectToJS(selectUserReview, 'review');

export { selectLoading, selectError, selectReview };
