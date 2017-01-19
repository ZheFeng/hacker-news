/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */
import config from '../config';

import topic from './topic';
import { setTopic } from '../actions';


describe('reducer:topic', () => {
  it('return default topic', () => {
    expect(topic()).toBe(config.topic);
    expect(topic(undefined, setTopic())).toBe(config.topic);
  });
  it('return set topic', () => {
    expect(topic(topic(), setTopic('test'))).toBe('test');
  });
});
