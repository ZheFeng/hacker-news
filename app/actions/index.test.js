/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */
import actions from '../actions';

describe('actions', () => {
  it('export action fetch', () => {
    expect(typeof actions.fetch).toBe('function');
  });
  it('export action setTopic', () => {
    expect(typeof actions.setTopic).toBe('function');
  });
  it('export action navigate', () => {
    expect(typeof actions.navigate).toBe('function');
  });
  it('export action setNews', () => {
    expect(typeof actions.setNews).toBe('function');
  });
});
