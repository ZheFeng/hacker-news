/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */
import topic from './topic';
import actions from '../actions';

const route = {
  location: { pathname: '/test' },
  action: 2,
};

describe('reducer:topic', () => {
  it('setTopic update topic', () => {
    expect(topic('before', actions.setTopic('after'))).toBe('after');
  });
  it('navigate update topic', () => {
    expect(topic({}, actions.navigate(route))).toEqual('test');
  });
});
