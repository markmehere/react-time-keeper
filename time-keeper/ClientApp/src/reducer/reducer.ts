import { AllAppActions } from "../actions/actions";

export type AppState = {
  name: string,
  loading: boolean,
  error: string,
  submitting: boolean
};

const initialState: AppState = {
  name: '',
  loading: true,
  error: '',
  submitting: false
};

export function reduce(state: AppState = initialState, action: AllAppActions): AppState {
  console.log(action);
  switch (action.type) {
    case 'LOAD_NAME_ACTION':
      return { ...state, name: action.name, loading: false };
    case 'SET_NAME_ACTION':
      return { ...state, name: action.name, submitting: action.preliminary };
  }
  return state;
}

