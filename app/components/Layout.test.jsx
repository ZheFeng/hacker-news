/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router';

import Layout from './Layout';

describe('<Layout />', () => {
  it('Snapshot Test', () => {
    const component = renderer.create(
      <BrowserRouter><Layout>Test</Layout></BrowserRouter>,
  );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
