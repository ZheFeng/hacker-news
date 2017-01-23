/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */

import { List } from 'immutable';

import news from './news';
import actions from '../actions';

const list = new List([1, 2, 3]);
describe('reducer:news', () => {
  it('return List on setNews', () => {
    const state = news(new List(), actions.setNews(list));
    expect(state).toBe(list);
  });
});
