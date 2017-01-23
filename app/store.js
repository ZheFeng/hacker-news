// @flow
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import createLogger from 'redux-logger';

// import actions from '.actions';
import Store from './reducers';

const fetchEpic = action$ => action$.ofType('FETCH').mapTo({ type: 'setNews' });
const epicMiddleware = createEpicMiddleware(fetchEpic);

const logger = createLogger({
  stateTransformer: state => state.toJS(),
});

const store = createStore(
    Store,
    applyMiddleware(epicMiddleware, logger),
  );
export default store;
