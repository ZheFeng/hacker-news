// @flow
import { handleActions } from 'redux-actions';

import config from '../config';
import history from '../history';
import actions from '../actions';

function getTopic(location: { pathname: string }) {
  const { pathname } = location;
  if (pathname.startsWith('/') && !pathname.substr(1).includes('/')) {
    return pathname.substr(1) || config.topic;
  }
  return config.topic;
}

export default handleActions({
  [actions.setTopic]: (state, { payload }) => payload,
  [actions.navigate]: (state, { payload }) => getTopic(payload.location),
}, getTopic(history.location));
