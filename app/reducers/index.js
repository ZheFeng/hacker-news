// @flow

import { combineReducers } from 'redux';
import news from './news';
import topic from './topic';

export default combineReducers({
  news,
  topic,
});
