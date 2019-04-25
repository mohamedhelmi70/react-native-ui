import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { Firebase } from '../../services/Firebase';
import NavigationService from '../../services/NavigationService';

import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SIGNUP_REQUEST,
  RESET_PASSWORD_REQUEST,
  CONFIRM_PASSWORD_REQUEST,
} from '../actions/actionTypes';

import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  signUpSuccess,
  signUpFailure, 
  syncUser,
  resetPasswordSuccess,
  resetPasswordFailure,
  confirmPasswordSuccess,
  confirmPasswordFailure,
} from '../actions/index';

function* loginSaga(action) {
  try {
    const { email, password } = action.payload;
    const auth = Firebase.auth();
    yield call([auth, auth.signInWithEmailAndPassword], email, password);
    yield put(loginSuccess());
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* signUpSaga(action) {
  try {
    const { email, password } = action.payload;
    const auth = Firebase.auth();
    yield call([auth, auth.createUserWithEmailAndPassword], email, password);
    yield put(signUpSuccess());
    yield call(NavigationService.navigate, 'Auth');
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

function* logoutSaga() {
  try {
    const auth = Firebase.auth();
    yield call([auth, auth.signOut]);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

function* resetPasswordSaga(action) {
  try {
    const { email } = action.payload;
    const auth = Firebase.auth();
    yield call([auth , auth.sendPasswordResetEmail], email);
    yield put(resetPasswordSuccess());
    yield call(NavigationService.navigate, 'confirmPassword');
  } catch (error) {
    yield put(resetPasswordFailure(error));
  }
}

function* confirmPasswordSaga(action) {
  try {
    const { code , newPassword } = action.payload;
    const auth = Firebase.auth();
    yield call([auth, auth.confirmPasswordReset ], code , newPassword);
    yield put(confirmPasswordSuccess());
    yield call(NavigationService.navigate, 'Auth');
  } catch (error) {
    yield put(confirmPasswordFailure(error));
  }
}; 

function authChannel() {
  return eventChannel(emit => {
    const unsubscribe = Firebase.auth().onAuthStateChanged(
      user => emit({ user }),
      error => emit({ error })
    );
    return unsubscribe;
  });
}

function* syncUserSaga() {
  const channel = yield call(authChannel);

  while (true) {
    const { user } = yield take(channel);
    if (user) {
      yield put(syncUser(user));
      yield call(NavigationService.navigate, 'Tab');
    } else {
      yield put(syncUser(null));
      yield call(NavigationService.navigate, 'Auth');
    }
  }
}

export default function* authRoot() {
  yield all([
    fork(syncUserSaga),
    takeEvery(LOGIN_REQUEST, loginSaga),
    takeEvery(LOGOUT_REQUEST, logoutSaga),
    takeEvery(SIGNUP_REQUEST, signUpSaga),
    takeEvery(RESET_PASSWORD_REQUEST, resetPasswordSaga),
    takeEvery(CONFIRM_PASSWORD_REQUEST, confirmPasswordSaga),
  ]);
}