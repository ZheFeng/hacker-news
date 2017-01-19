/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';


function render(Component) {
  const mountNode = document.getElementById('app');// eslint-disable-line
  const node = (
    <AppContainer>
      <Component />
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
