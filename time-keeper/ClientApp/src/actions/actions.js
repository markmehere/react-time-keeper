"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
function setNameAction(name, preliminary) {
    var type = 'SET_NAME_ACTION';
    return { type: type, name: name, preliminary: preliminary };
}
exports.setNameAction = setNameAction;
function setErrorAction(error) {
    var type = 'SET_ERROR_ACTION';
    return { type: type, error: error || 'Unable to reach server' };
}
exports.setErrorAction = setErrorAction;
function loadNameAction(name) {
    var type = 'LOAD_NAME_ACTION';
    return { type: type, name: name };
}
exports.loadNameAction = loadNameAction;
function fetchName() {
    return fetch(config_1.API_HOST + '/holder');
}
function putName(value) {
    return fetch(config_1.API_HOST + '/holder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ holder: value })
    });
}
function setNameThunk(name) {
    return function (dispatch) {
        dispatch(setNameAction(name, true));
        return putName(name).then(function () { return dispatch(setNameAction(name, false)); }, function (errPayload) { return dispatch(setErrorAction(errPayload.statusText)); });
    };
}
exports.setNameThunk = setNameThunk;
function loadNameThunk() {
    return function (dispatch) {
        return fetchName().then(function (namePayload) { return namePayload.json().then(function (data) { return dispatch(loadNameAction(data.holder)); }); }, function (errPayload) { return dispatch(setErrorAction(errPayload.statusText)); });
    };
}
exports.loadNameThunk = loadNameThunk;
//# sourceMappingURL=actions.js.map