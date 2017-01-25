/* eslint-disable react/jsx-filename-extension */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rxjs';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const mountNode = document.getElementById('app');

if (module.hot) {
  /* eslint-disable */
  const { AppContainer } = require('react-hot-loader');

  function render(Component) {
    const node = (
      <AppContainer>
        <Component />
      </AppContainer>
    );
    ReactDOM.render(node, mountNode);
  }

  render(App);

  // Hot Module Replacement API
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default;
    render(NewApp);
  });
    /* eslint-enable */
} else {
  ReactDOM.render(<App />, mountNode);
}
