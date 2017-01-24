/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';

import Spin from './Spin';

describe('<Spin />', () => {
  it('Snapshot Test', () => {
    const component = renderer.create(
      <Spin />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
