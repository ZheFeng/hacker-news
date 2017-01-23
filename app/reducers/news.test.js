/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */

import { List } from 'immutable';

import news from './news';
import actions from '../actions';

const route = {
  location: {
    pathname: '/test',
  },
  action: 2,
};
const list = new List([1, 2, 3]);
describe('reducer:news', () => {
  it('return List on setNews', () => {
    const state = news(new List(), actions.setNews(list));
    expect(state).toBe(list);
  });
  it('empty list when navigation changed', () => {
    const state = news(new List(), actions.setNews(list));
    expect(state.size).toBe(3);
    expect(news(state, actions.navigate(route)).size).toBe(0);
  });
});
