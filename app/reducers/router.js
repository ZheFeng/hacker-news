// @flow
import { handleActions } from 'redux-actions';

import actions from '../actions';
import history from '../history';

type locationType = { pathname: string }
type routerType = {
  location: locationType,
  action: string,
}

const defaultState: routerType = {
  location: history.location,
  action: history.action,
};

export default handleActions({
  [actions.navigate]: (state, { payload: { location, action } }) => ({
    location,
    action,
  }),
}, defaultState);
