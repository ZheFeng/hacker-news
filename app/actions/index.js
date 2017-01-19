// @flow
import config from '../config';

export const fetch = () => ({
  type: 'FETCH',
});

export const setTopic = (topic: string = config.topic) => ({
  type: 'SET_TOPIC',
  topic,
});


export const navigate = (location, action) => ({
  type: 'NAVIGATE',
  location,
  action,
});
