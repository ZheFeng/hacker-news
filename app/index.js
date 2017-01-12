/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

function render(Component) {
  const mountNode = document.getElementById('app');
  const node = (
    <AppContainer>
      <Component name="World" />
    </AppContainer>
  );
  ReactDOM.render(node, mountNode);
}

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default;
    render(NewApp);
  });
}
