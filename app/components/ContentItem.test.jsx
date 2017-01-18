/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';
import { Map } from 'immutable';

import ContentItem from './ContentItem';

const item = new Map({
  title: 'test title',
  time: 1484625248277,
});

describe('<ContentItem />', () => {
  it('Snapshot Test', () => {
    const component = renderer.create(
      <ContentItem data={item} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
