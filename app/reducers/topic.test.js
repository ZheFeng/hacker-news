/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */
import config from '../config';

import topic from './topic';
import { setTopic } from '../actions';


describe('reducer:news', () => {
  it('return List', () => {
    expect(topic()).toBe(config.topic);
    expect(topic(undefined, setTopic())).toBe(config.topic);
    expect(topic(topic(), setTopic('test'))).toBe('test');
  });
});
