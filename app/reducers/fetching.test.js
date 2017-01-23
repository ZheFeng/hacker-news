/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */

import fetching from './fetching';
import actions from '../actions';

describe('reducer:fetching', () => {
  it('return false as default', () => {
    const state = fetching(undefined, { type: 'some action' });
    expect(state).toBe(false);
  });
  it('return true when fetch action be triggered', () => {
    const state = fetching(false, actions.fetch());
    expect(state).toBe(true);
  });
  it('return false when setNews action be triggered', () => {
    const state = fetching(true, actions.setNews());
    expect(state).toBe(false);
  });
});
