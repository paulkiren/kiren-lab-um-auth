import { call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginRequest, loginSuccess, loginFailure } from './authSlice';
import { loginApi } from '../api/authApi';
import { navigationRef } from '../navigation/AppNavigator';

// Worker saga: Handles login logic
function* loginSaga(action) {
  try {
    const response = yield call(loginApi, action.payload);
    console.log("Response HAHAH",response);
    yield AsyncStorage.setItem('token', response.accessToken);
    yield put(loginSuccess(response));
    if (navigationRef.current?.isReady()) {
      navigationRef.current?.navigate('HomeTabs');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put(loginFailure(errorMessage));
  }
}

// Watcher saga
export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
}
