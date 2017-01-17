import React from 'react';
import renderer from 'react-test-renderer';
import { Map } from 'immutable';

import ContentItem from './ContentItem';

const item = new Map({
  title: 'test title',
  time: 1484625248277,
})

test('ContentItem show title and time', () => {
  const component = renderer.create(
    <ContentItem data={item} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
