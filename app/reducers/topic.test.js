/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */
import topic from './topic';
import actions from '../actions';


describe('reducer:topic', () => {
  it('setTopic update topic', () => {
    expect(topic('before', actions.setTopic('after'))).toBe('after');
  });
});
