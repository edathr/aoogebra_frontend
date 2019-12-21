import { createSelector } from 'reselect';

const selectToJS = (localStore, key) =>
  createSelector(
    localStore,
    state => {
      const temp = state.get(key);
      return temp ? temp.toJS() : null;
    },
  );

const select = (localStore, key) =>
  createSelector(
    localStore,
    store => store.get(key),
  );

export { selectToJS, select };
