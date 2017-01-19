// @flow
import config from '../config';
import history from '../history';

function getTopic(location: { pathname: string }) {
  const { pathname } = location;
  if (pathname.startsWith('/') && !pathname.substr(1).includes('/')) {
    return pathname.substr(1) || config.topic;
  }
  return config.topic;
}

export default (
  state: string = getTopic(history.location),
  action: { type: string, topic: string, location: { pathname:string } },
) => {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case 'SET_TOPIC':
      return action.topic;
    case 'NAVIGATE':
      return getTopic(action.location);
    default:
      return state;
  }
};
