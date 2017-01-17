import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter, Match, Miss } from 'react-router';
import { shallow } from 'enzyme';
import { Map } from 'immutable';

import News from './News';

describe('<News />', () => {
  it('Snapshot Test', () => {
    const component = renderer.create(
      <News />,
  );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
