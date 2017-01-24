// @flow
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { List } from 'immutable';
import createLogger from 'redux-logger';

import actions from './actions';
import Store from './reducers';
import { fetchNews$ } from './api';

const numberPerPage = 5;

function pageCount(store, page) {
  if (page && page.topic === store.getState().get('topic')) {
    return { topic: page.topic, count: page.count + 1 };
  }
  return { topic: store.getState().get('topic'), count: 0 };
}

function fetchEpic(action$, store) {
  return action$.ofType('FETCH')
  .scan(pageCount.bind(null, store), null)
  .mergeMap((page) => {
    console.log(page);
    return fetchNews$(store.getState().get('topic'), page.count * numberPerPage, numberPerPage).map(actions.setNews);
  });
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
