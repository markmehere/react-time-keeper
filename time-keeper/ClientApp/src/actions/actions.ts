import { Dispatch } from "redux";
import { API_HOST } from "../config";

export type AllAppActionTypes = 'SET_NAME_ACTION' | 'LOAD_NAME_ACTION' | 'SET_ERROR_ACTION';

export type SetNameAppAction = {
  type: AllAppActionTypes,
  name: string,
  preliminary: boolean
};

export type LoadNameAppAction = {
  type: AllAppActionTypes,
  name: string
};

export type SetErrorAppAction = {
  type: AllAppActionTypes,
  error: string
}

export type AllAppActions = SetNameAppAction;

export function setNameAction(name: string, preliminary: boolean): SetNameAppAction {
  const type: AllAppActionTypes = 'SET_NAME_ACTION';
  return { type, name, preliminary };
}

export function setErrorAction(error: string): SetErrorAppAction {
  const type: AllAppActionTypes = 'SET_ERROR_ACTION';
  return { type, error: error || 'Unable to reach server' };
}

export function loadNameAction(name: string): LoadNameAppAction {
  const type: AllAppActionTypes = 'LOAD_NAME_ACTION';
  return { type, name };
}

function fetchName() {
  return fetch(API_HOST + '/holder');
}

function putName(value: string) {
  return fetch(API_HOST + '/holder', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ holder: value })
  });
}

export function setNameThunk(name: string) {
  return function (dispatch: Dispatch) {
    dispatch(setNameAction(name, true));
    return putName(name).then(
        () => dispatch(setNameAction(name, false)),
        (errPayload) => dispatch(setErrorAction(errPayload.statusText))
    );
  }
}

export function loadNameThunk() {
  return function (dispatch: Dispatch) {
    return fetchName().then(
      (namePayload) => namePayload.json().then((data) => dispatch(loadNameAction(data.holder))),
      (errPayload) => dispatch(setErrorAction(errPayload.statusText))
    );
  };
}