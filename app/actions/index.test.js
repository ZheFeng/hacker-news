/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */
import actions from '../actions';

describe('actions', () => {
  it('export action map', () => {
    expect(typeof actions.fetch).toBe('function');
  });
});
