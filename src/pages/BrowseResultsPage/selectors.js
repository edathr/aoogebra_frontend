import { select, selectToJS } from '@utils/selectorUtils';
import { initialState } from './reducers';

const selectBrowseResultsPage = state => state.get('BrowseResultsPage', initialState);

const selectBooks = selectToJS(selectBrowseResultsPage, 'books');

const selectTotalCount = select(selectBrowseResultsPage, 'totalCount');

const selectPageSize = select(selectBrowseResultsPage, 'pageSize');

const selectPageNum = select(selectBrowseResultsPage, 'pageNum');

const selectLoading = select(selectBrowseResultsPage, 'loading');

const selectError = select(selectBrowseResultsPage, 'error');

export { selectBooks, selectTotalCount, selectPageNum, selectPageSize, selectLoading, selectError };
