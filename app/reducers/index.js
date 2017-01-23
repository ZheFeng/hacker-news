// @flow

import { combineReducers } from 'redux-immutable';
import news from './news';
import topic from './topic';
import router from './router';
import fetching from './fetching';

export default combineReducers({
  news,
  topic,
  router,
  fetching,
});
