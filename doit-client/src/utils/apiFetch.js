/* global Request, fetch */
// base url
import { localStorageGetString } from '../lib/storageManager';
export const baseURL = '/api/v1';

// default headers
export const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export default async function apiFetch(url, opts = {}) {
  const { method = 'GET', body, headers } = opts;
  const token = localStorageGetString('token');

  if (token) {
    defaultHeaders.authorization = localStorageGetString('token');
  }

  const init = {
    ...opts,
    method: method.toUpperCase(),
    headers: { ...defaultHeaders, ...headers },
    credentials: 'include',
  };

  if (body) {
    init.headers['Content-Type'] = 'application/json';
    init.body = JSON.stringify(body);
  }

  const request = new Request(`${baseURL}${url}`, init);
  const res = await fetch(request);

  if (!res.ok) throw Error(`${res.status} ${res.statusText}`);

  const payload = await res.json();
  return payload;
}
