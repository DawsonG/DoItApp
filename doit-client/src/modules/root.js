import { all } from 'redux-saga/effects';

import user, { userSaga } from './user';
import todos, { todosSaga } from './todos';

export function* rootSaga() {
  yield all([
    userSaga(),
    todosSaga(),
  ]);
}

export const reducers = {
  user,
  todos,
};
