// @flow
import history from '../history';

type locationType = { pathname: string }
type routerType = {
  location: locationType,
  action: string,
}

export default (state: routerType, action: { type: string }): routerType => {
  if (action.type === 'NAVIGATE') {
    return {
      location: action.location,
      action: action.action,
    };
  }
  return state || {
    location: history.location,
    action: history.action,
  };
};
