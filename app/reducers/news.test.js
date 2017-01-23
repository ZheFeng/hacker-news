/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */

import { List } from 'immutable';

import news from './news';
import actions from '../actions';

const list = new List();
describe('reducer:news', () => {
  it('return List on setNews', () => {
    expect(List.isList(news(list, actions.setNews(list)))).toBe(true);
  });
});
