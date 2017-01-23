// @flow
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { List } from 'immutable';
import createLogger from 'redux-logger';

import actions from './actions';
import Store from './reducers';
import { fetchNews$ } from './api';


function fetchEpic(action$, store) {
  return action$.ofType('FETCH')
  .mergeMap(action => fetchNews$(store.getState().get('topic'), 0, 10).map(news => actions.setNews(news)));
}
function navigateEpic(action$, store) {
  return action$.ofType('NAVIGATE').mapTo(actions.fetch());
}

const rootEpic = combineEpics(
  fetchEpic,
  navigateEpic,
);
const epicMiddleware = createEpicMiddleware(rootEpic);

const logger = createLogger({
  stateTransformer: state => state.toJS(),
});

const store = createStore(
    Store,
    applyMiddleware(epicMiddleware, logger),
  );
export default store;
