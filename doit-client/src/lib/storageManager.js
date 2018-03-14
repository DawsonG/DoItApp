/* global localStorage */

export function localStorageGet(key) {
  if (!localStorage.getItem(key)) {
    return null;
  }

  return JSON.parse(localStorage.getItem(key));
}

export function localStorageGetString(key) {
  return localStorage.getItem(key);
}

export function localStorageSet(key, value) {
  if (value) {
    const vnormal = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, vnormal);
  }
}

export function localStorageRemove(key) {
  localStorage.removeItem(key);
}
