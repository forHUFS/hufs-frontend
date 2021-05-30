import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducer/index';
import PromiseMiddleware from 'redux-promise';
import App from './App';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import { errorMessage } from './functions/errorHandling';
const createStoreWithMiddleware = applyMiddleware(
  PromiseMiddleware,
  ReduxThunk,
)(createStore);

axios.defaults.withCredentials = true;
// axios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     errorMessage(error.response?.data.message);
//     return Promise.reject(error);
//   },
// );
ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      Reducer,
      composeWithDevTools(applyMiddleware()),
    )}
  >
    <App />
  </Provider>,
  document.getElementById('root'),
);
