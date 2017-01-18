/*
  eslint-disable
  import/first, import/no-extraneous-dependencies, max-nested-callbacks
*/
/* global jest, describe, it, expect */
jest.mock('../api');

import React from 'react';
import renderer from 'react-test-renderer';

import News from './News';

describe('<News />', () => {
  it('Snapshot Test', () => {
    const component = renderer.create(
      <News />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
