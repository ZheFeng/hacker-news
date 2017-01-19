/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */

import { List } from 'immutable';

import news from './news';
import { fetch } from '../actions';


describe('reducer:news', () => {
  it('return List', () => {
    const result = news(undefined, fetch());
    expect(List.isList(result)).toBe(true);
  });
});
