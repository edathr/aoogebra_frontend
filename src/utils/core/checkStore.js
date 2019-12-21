import { conformsTo, isFunction, isObject } from 'lodash';
import invariant from 'invariant';

export default function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    getState: isFunction,
    injectedReducers: isObject,
    injectedSagas: isObject,
    subscribe: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
  };
  invariant(conformsTo(store, shape), '(src/utils...) injectors: Expected a valid redux store');
}
