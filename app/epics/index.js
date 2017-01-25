// @flow

import { combineEpics } from 'redux-observable';
import fetch from './fetch';

export default combineEpics(
  fetch,
);
