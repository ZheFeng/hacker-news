/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';
import { Map, List } from 'immutable';

import ContentList from './ContentList';

function itemFactory(id): Map {
  return new Map({
    id,
    title: 'test title',
    time: 1484625248277,
    text: 'test text',
    url: 'http://test.com',
  });
}

function listFactory(list: List<*>): List<*> {
  const size = list.size;
  const newList = new List([itemFactory(size), itemFactory(size + 1)]);
  return list.concat(newList);
}


describe('<ContentList />', () => {
  it('Snapshot Test', () => {
    const component = renderer.create(
      <ContentList list={listFactory(new List())} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
