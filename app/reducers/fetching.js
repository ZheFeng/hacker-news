// @flow
import { handleActions } from 'redux-actions';

import actions from '../actions';

export default handleActions({
  [actions.fetch]: () => true,
  [actions.setNews]: () => false,
}, false);
