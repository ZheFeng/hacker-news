/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */
import router from './router';
import actions from '../actions';

const route = {
  location: 1,
  action: 2,
};
describe('reducer:router', () => {
  it('navigate update router', () => {
    expect(router({}, actions.navigate(route))).toEqual(route);
  });
});
