// @flow
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import createLogger from 'redux-logger';

import Store from './reducers';
import rootEpic from './epics';


const epicMiddleware = createEpicMiddleware(rootEpic);
const loggerMiddleware = createLogger({ stateTransformer: s => s.toJS() });

const middlewares = [epicMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(loggerMiddleware);
}

const store = createStore(
    Store,
    applyMiddleware(...middlewares),
  );
export default store;
