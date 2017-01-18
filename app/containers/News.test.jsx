/*
  eslint-disable
  import/first, import/no-extraneous-dependencies, max-nested-callbacks
*/
/* global jest, describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Store from '../Store';

const store = createStore(Store);

import News from './News';

describe('<News />', () => {
  it('Snapshot Test', () => {
    const component = renderer.create(
      <Provider store={store}><News /></Provider>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
