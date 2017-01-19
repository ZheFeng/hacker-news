// @flow

import { combineReducers } from 'redux';
import news from './news';
import topic from './topic';
import router from './router';

export default combineReducers({
  news,
  topic,
  router,
});
