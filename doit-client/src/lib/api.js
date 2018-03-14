import fetch from '../utils/apiFetch';

/*
 * /api/v1/users
 */
export const authUser = (email, password) =>
  fetch('/users/auth', {
    method: 'POST',
    body: {
      email,
      password,
    }
  });

export const userFromToken = () =>
  fetch('/users/self', {
    method: 'POST',
  });

export const registerUser = (username, email, password) => 
  fetch('/users/register', {
    method: 'POST',
    body: {
      username,
      email,
      password
    }
  });

/*
 * /api/v1/todos
 */
export const fetchTodos = () => fetch('/todos');

export const addTodo = (task, dueDate, priority) =>
  fetch('/todos', {
    method: 'POST',
    body: {
      task,
      dueDate,
      priority,
    }
  });

export const completeTodo = (id, isComplete) =>
  fetch('/todos/complete', {
    method: 'POST',
    body: {
      id,
      isComplete,
    }
  });

export const reorderTodos = (items) =>
  fetch('/todos/reorder', {
    method: 'POST',
    body: {
      items,
    },
  });
