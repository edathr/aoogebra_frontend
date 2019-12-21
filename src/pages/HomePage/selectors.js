import { selectToJS } from '@utils/selectorUtils';
import { initialState } from './reducers';

const selectHomePage = state => state.get('HomePage', initialState);

const selectLoading = selectToJS(selectHomePage, 'loading');

const selectError = selectToJS(selectHomePage, 'error');

const selectRecommendBooks = selectToJS(selectHomePage, 'recommendBooks');

const selectBestsellBooks = selectToJS(selectHomePage, 'bestsellBooks');

export { selectLoading, selectError, selectRecommendBooks, selectBestsellBooks };
