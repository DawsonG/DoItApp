import { call, put, all, takeLatest, takeEvery } from 'redux-saga/effects';
import { createActions, handleActions } from 'redux-actions';
import { findIndex } from 'lodash';

import * as api from '../lib/api';

export const actions = createActions(
  'FETCH_TODOS',
  'FETCH_TODOS_RESPONSE',
  'ADD_TODO',
  'ADD_TODO_RESPONSE',
  'COMPLETE_TODO',
  'COMPLETE_TODO_RESPONSE',
  'REORDER_TODOS',
);

const defaultState = {
  items: []
};

export const selectors = {
  todos: state => state.todos.items,
};

function* fetchTodos() {
  try {
    const response = yield call(api.fetchTodos);
    yield put(actions.fetchTodosResponse(response));
  } catch (e) {
    yield put(actions.fetchTodosResponse(e));
  }
}

function* addTodo({ payload: { task, dueDate, priority }}) {
  try {
    const response = yield call(api.addTodo, task, dueDate, priority);
    yield put(actions.addTodoResponse(response));
  } catch (e) {
    yield put(actions.addTodoResponse(e));
  }
}

function* completeTodo({ payload: { id, flipValue }}) {
  try {
    const response = yield call(api.completeTodo, id, flipValue);
    yield put(actions.completeTodoResponse(response));
  } catch (e) {
    yield put(actions.completeTodoResponse(e));
  }
}

function* reorderTodos({ payload: { items }}) {
  try {
    yield call(api.reorderTodos, items);
  } catch (e) {

  }
}

export function* todosSaga() {
  yield all([
    takeLatest(actions.fetchTodos, fetchTodos),
    takeEvery(actions.addTodo, addTodo),
    takeLatest(actions.completeTodo, completeTodo),
    takeLatest(actions.reorderTodos, reorderTodos),
  ]);
}

export default handleActions({
  [actions.fetchTodosResponse]: {
    next(state, { payload }) {
      const { success, todos } = payload;
      if (!success) {
        return { ...state };
      }

      return { ...state, items: todos };
    },
    throw(state) {
      return { ...defaultState };
    },
  },
  [actions.addTodoResponse]: {
    next(state, { payload }) {
      if (payload.success) {
        return {
          ...state,
          items: [
            ...state.items,
            payload.item
          ]
        };
      }

      return { ...state };
    },
    throw(state) {
      return { ...defaultState };
    }
  },
  [actions.completeTodoResponse]: {
    next(state, { payload }) {
      if (!payload.success) {
        return { ...state };
      }

      const items = state.items.slice();
      items[findIndex(items, { id: payload.id })] = payload.item;

      return {
        ...state,
        items
      };
    },
    throw(state) {
      return { ...defaultState };
    },
  },
}, defaultState);
