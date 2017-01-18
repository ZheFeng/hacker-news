/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line

import 'bootstrap/dist/css/bootstrap.min.css';

import Store from './Store';
import App from './App';

const store = createStore(Store);

setInterval(() => { store.dispatch({ type: 'INCREMENT' }); }, 1000);

function render(Component) {
  const mountNode = document.getElementById('app');// eslint-disable-line
  const node = (
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>
  );
  ReactDOM.render(node, mountNode);
}

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default;// eslint-disable-line
    render(NewApp);
  });
}
