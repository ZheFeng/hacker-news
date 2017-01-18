/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';

import NoMatch from './NoMatch';

const location = {
  pathname: 'test',
};

describe('<NoMatch />', () => {
  it('Snapshot Test', () => {
    const component = renderer.create(
      <NoMatch location={location} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
