import {call, put} from '@redux-saga/core/effects';
import api from '~/services/api';
import {getSessionSuccess, getSessionFailed} from './authAction';

export function* SignIn({payload}) {
  const {email, password} = payload;

  try {
    const response = yield call(api.post, '/session', {email, password});
    yield put(getSessionSuccess(response.data));
  } catch (error) {
    yield put(getSessionFailed('Usuario não encontrado'));
  }
}
