"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var initialState = {
    name: '',
    loading: true,
    error: '',
    submitting: false
};
function reduce(state, action) {
    if (state === void 0) { state = initialState; }
    console.log(action);
    switch (action.type) {
        case 'LOAD_NAME_ACTION':
            return __assign({}, state, { name: action.name, loading: false });
        case 'SET_NAME_ACTION':
            return __assign({}, state, { name: action.name, submitting: action.preliminary });
    }
    return state;
}
exports.reduce = reduce;
//# sourceMappingURL=reducer.js.map