/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';

import ContentItem from './ContentItem';

const title = 'test title';
const d = new Date(2010, 1, 1);
const time = d.getTime();
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
