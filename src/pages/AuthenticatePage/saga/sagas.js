import { select, put } from 'redux-saga/effects';

import { goto } from '@utils/goto';

export function* authSuccessHandler(cleanUpPrevPath) {
  const prevPath = yield select(state => state.getIn(['AppLayout', 'prevPath']));

  if (prevPath) {
    put({ type: cleanUpPrevPath });
  }
  yield goto(prevPath || '/');
}
