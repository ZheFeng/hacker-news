// @flow
import history from '../history';

export default (state = {
  location: history.location,
  action: history.action,
}, action) => {
  if (action.type === 'NAVIGATE') {
    return {
      location: action.location,
      action: action.action,
    };
  }
  return state;
};
