import { put, call } from 'redux-saga/effects';

export default function* modalSubmitHandler(
  actionSuccess,
  actionFailure,
  actionCloseModal,
  api,
  params,
) {
  try {
    yield call(api, params);

    // Dispatch success action
    yield put({
      type: actionSuccess,
    });

    // Dispatch close modal action
    yield put({
      type: actionCloseModal,
    });
  } catch (error) {
    // Dispatch failure action
    yield put({
      type: actionFailure,
      error,
    });
  }
}
