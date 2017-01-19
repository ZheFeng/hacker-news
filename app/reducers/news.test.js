/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */

import { List } from 'immutable';

import news from './news';
import { fetch } from '../actions';


describe('reducer:news', () => {
  it('return List', () => {
    expect(List.isList(news())).toBe(true);
  });
});
