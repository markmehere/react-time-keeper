import React from 'react';
import logo from './logo.svg';
import { Clock } from './components/Clock/Clock';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { reduce } from './reducer/reducer';
import { NameChange } from './components/NameChange/NameChange';
import { loadNameThunk } from './actions/actions';
import thunk from 'redux-thunk';
import './App.scss';

function App() {

  const store = createStore(reduce, applyMiddleware(thunk));

  store.dispatch(loadNameThunk() as any);
  setInterval(
    () => store.dispatch(loadNameThunk() as any),
    2000
  );
  

  return (
    <Provider store={store}>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <Clock></Clock>
        <NameChange></NameChange>
      </div>
    </Provider>
  );
}

export default App;
