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


  it('contain navs', () => {
  // Render a checkbox with label in the document
  //   const layout = shallow(
  //     <BrowserRouter><Layout>Test</Layout></BrowserRouter>,
  // );
  //   expect(layout.find('.navbar-nav').children()).to.have.length(5);
  // const navbar = layout.find('.navbar-nav').first();
  // const count = navbar.children().map(n => n).length;
  // console.log(layout.html());
  // console.log(navbar.html());
  // console.log(count);
  // expect(count).toBeGreaterThan(0);
  });
});
