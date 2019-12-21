import { select, selectToJS } from '@utils/selectorUtils';
import { initialState } from './reducers';
import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';
import concat from 'lodash/concat';

const selectFilterBar = state => state.get('FilterBar', initialState);

const selectError = selectToJS(selectFilterBar, 'error');

const selectLoading = selectToJS(selectFilterBar, 'loading');

const selectSearchResults = createSelector(
  selectFilterBar,
  state => {
    const selectedBookAsin = state.getIn(['selectedBook', 'bookId']);
    const result = state.get('searchResults').reduce((compileResult, value) => {
      if (isEqual(value.get('asin'), selectedBookAsin)) {
        return concat([value.toObject()], compileResult);
      }
      compileResult.push(value.toObject());
      return compileResult;
    }, []);
    return result;
  },
);

const selectAutocompleteResults = selectToJS(selectFilterBar, 'autocompleteResults');

const selectSelectedBook = selectToJS(selectFilterBar, 'selectedBook');

export {
  selectError,
  selectLoading,
  selectSearchResults,
  selectAutocompleteResults,
  selectSelectedBook,
};
