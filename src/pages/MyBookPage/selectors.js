import { select, selectToJS } from '@utils/selectorUtils';
import { initialState } from './reducers';

const selectMyBookPage = state => state.get('MyBookPage', initialState);

const selectLoading = selectToJS(selectMyBookPage, 'loading');

const selectError = selectToJS(selectMyBookPage, 'error');

const selectFavourite = selectToJS(selectMyBookPage, 'favourite');

const selectMyReviews = selectToJS(selectMyBookPage, 'myReviews');

const selectTotalReviewCount = select(selectMyBookPage, 'totalReviewCount');

const selectCurrentReviewPageNum = select(selectMyBookPage, 'currentReviewPageNum');

const selectPageSize = select(selectMyBookPage, 'pageSize');

export {
  selectLoading,
  selectError,
  selectFavourite,
  selectMyReviews,
  selectTotalReviewCount,
  selectCurrentReviewPageNum,
  selectPageSize,
};
