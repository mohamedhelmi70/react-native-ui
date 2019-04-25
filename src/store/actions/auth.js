import { createAction } from 'redux-actions';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SYNC_USER,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILUR,
  CONFIRM_PASSWORD_REQUEST,
  CONFIRM_PASSWORD_SUCCESS,
  CONFIRM_PASSWORD_FAILURE,
} from '../actions/actionTypes';

export const login = createAction(LOGIN_REQUEST, (email, password) => ({
  email,
  password,
}));

export const loginSuccess = createAction(LOGIN_SUCCESS);

export const loginFailure = createAction(LOGIN_FAILURE, error => ({
  error
}));

export const logout = createAction(LOGOUT_REQUEST);

export const logoutSuccess = createAction(LOGOUT_SUCCESS);

export const logoutFailure = createAction(LOGOUT_FAILURE, error => ({
  error
}));

export const signUp = createAction(SIGNUP_REQUEST, (email, password) => ({
  email,
  password,
}));

export const signUpSuccess = createAction(SIGNUP_SUCCESS);

export const signUpFailure = createAction(SIGNUP_FAILURE, error => ({
  error
}));

export const syncUser = createAction(SYNC_USER, user => ({
  user,
}));

export const resetPassword = createAction(RESET_PASSWORD_REQUEST, email => ({
  email,
}));

export const resetPasswordSuccess = createAction(RESET_PASSWORD_SUCCESS);

export const resetPasswordFailure = createAction(RESET_PASSWORD_FAILUR, error => ({
  error
}));

export const confirmPassword = createAction(CONFIRM_PASSWORD_REQUEST, (code, password) => ({
  code,
  password
}));

export const confirmPasswordSuccess = createAction(CONFIRM_PASSWORD_SUCCESS);

export const confirmPasswordFailure = createAction(CONFIRM_PASSWORD_FAILURE, error => ({
  error
}));
