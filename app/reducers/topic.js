// @flow
import config from '../config';

export default (
  state: string = config.topic,
  action: { type: string, topic: string },
) => {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case 'SET_TOPIC':
      return action.topic;
    default:
      return state;
  }
};
