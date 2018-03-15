import { call, all, put, takeLatest } from 'redux-saga/effects';
import { createActions, handleActions } from 'redux-actions';

import * as api from '../lib/api';
import * as storageManager from '../lib/storageManager';
import history from '../lib/history';

export const actions = createActions(
  'AUTH_USER',
  'AUTH_USER_RESPONSE',
  'USER_FROM_TOKEN',
  'REGISTER_USER',
  'REGISTER_RESPONSE',
  'LOGOUT',
  'LOGOUT_RESPONSE',
);

let token = storageManager.localStorageGetString('token');
const defaultState = {
  loading: false,
  error: false,
  message: '',
  loggedIn: false,
  user: null,
  token,
};

export const selectors = {
  error: state => state.user.error,
  message: state => state.user.message,
};

function* authUser({ payload: { email, password }}) {
  try {
    const response = yield call(api.authUser, email, password);
    yield put(actions.authUserResponse(response));
    if (response.success) {
      storageManager.localStorageSet('token', response.token);
    }
  } catch (e) {
    yield put(actions.authUserResponse(e));
  }
}

function* userFromToken({ payload: { token }}) {
  try {
    const response = yield call(api.userFromToken, token);
    if (response.success) {
      storageManager.localStorageSet('token', response.token);
      yield put(actions.authUserResponse(response));
    }
  } catch (e) {
    storageManager.localStorageRemove('token');
    yield put(actions.authUserResponse(e));
  }
}

function* registerUser({ payload: { username, email, password }}) {
  try {
    const response = yield call(api.registerUser, username, email, password);

    yield put(actions.registerResponse(response));
    if (response.success) {
      yield call(history.push, '/login');
    }
  } catch (e) {
    yield put(actions.registerResponse(e));
  }
}

function* logout() {
  storageManager.localStorageRemove('token');
  yield put(actions.logoutResponse());
}

export function* userSaga() {
  yield all([
    takeLatest(actions.authUser, authUser),
    takeLatest(actions.userFromToken, userFromToken),
    takeLatest(actions.registerUser, registerUser),
    takeLatest(actions.logout, logout),
  ]);
}

export default handleActions({
  [actions.authUserResponse]: {
    next(state, { payload }) {
      if (payload.success) {
        return { ...state, loggedIn: true, user: payload.user, error: false, message: '' };
      }

      return { ...state, loggedIn: false, user: undefined, message: payload.message };
    },
    throw(state) {
      return { ...defaultState, loggedIn: false };
    },
  },
  [actions.registerResponse]: {
    next(state, { payload }) {
      console.log(payload);
      if (payload.success) {
        return { ...state, error: false, message: 'User created. Please login.' };
      }

      return { ...state, error: true, message: payload.message };
    },
    throw(state) {
      return { ...defaultState, error: true, message: 'Server Error' };
    },
  },
  [actions.logoutResponse]: {
    next(state, { payload }) {
      return { ...state, loggedIn: false, user: undefined, error: false, message: '' };
    },
    throw(state) {
      return { ...defaultState, loggedIn: false };
    }
  }
}, defaultState);
