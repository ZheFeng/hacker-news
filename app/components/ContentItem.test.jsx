/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';

import ContentItem from './ContentItem';

const title = 'test title';
const time = 1484625248277;
const text = 'test text';
const url = 'http://test.com';

describe('<ContentItem />', () => {
  it('Snapshot Test', () => {
    const component = renderer.create(
      <ContentItem title={title} time={time} text={text} url={url} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
