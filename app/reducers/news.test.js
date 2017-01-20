/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */

import { List } from 'immutable';

import news from './news';
import actions from '../actions';


describe('reducer:news', () => {
  it('return List', () => {
    expect(List.isList(news(new List(), actions.fetch()))).toBe(true);
  });
});
