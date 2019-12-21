import { put, call } from 'redux-saga/effects';

const defaultAction = (action, data) => ({
  type: action,
  payload: data,
});

export default function* commonSaga(actionSuccess, actionFailure, api, params) {
  try {
    const result = yield call(api, params);
    yield put(defaultAction(actionSuccess, result));
  } catch (error) {
    yield put(defaultAction(actionFailure, error));
  }
}
