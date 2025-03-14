import { call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginRequest, loginSuccess, loginFailure } from './authSlice';
import { loginApi } from '../api/authApi';

// Worker saga: Handles login logic
function* loginSaga(action) {
  try {
    const response = yield call(loginApi, action.payload);
    yield AsyncStorage.setItem('token', response.token);
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

// Watcher saga
export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
}
