/* eslint-disable import/no-extraneous-dependencies, max-nested-callbacks */
/* global jest, describe, it, expect */
 import React from 'react';
 import renderer from 'react-test-renderer';

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
