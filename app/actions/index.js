// @flow
export const fetch = () => ({
  type: 'FETCH',
});

export const setTopic = (topic: string) => ({
  type: 'SET_TOPIC',
  topic,
});
