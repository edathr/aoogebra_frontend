import { select, selectToJS } from '@utils/selectorUtils';
import { initialState } from './reducers';
import { createSelector } from 'reselect';
import sampleSize from 'lodash/sampleSize';

const selectAppLayout = state => state.get('AppLayout', initialState);

const selectUserInfo = selectToJS(selectAppLayout, 'user');

const selectLoggedIn = createSelector(
  selectAppLayout,
  state => {
    const user = state.get('user').toObject();
    const { username, access_token } = user;
    return !!username && !!access_token;
  },
);

const selectLoading = select(selectAppLayout, 'loading');

const selectError = select(selectAppLayout, 'error');

const selectGenres = createSelector(
  selectAppLayout,
  state => {
    const genres = state.get('genres').toJS();
    return sampleSize(genres, 28);
  },
);

export { selectUserInfo, selectLoggedIn, selectLoading, selectError, selectGenres };
