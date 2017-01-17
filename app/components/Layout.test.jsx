import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter, Match, Miss } from 'react-router';
import { shallow } from 'enzyme';
import { Map } from 'immutable';

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
