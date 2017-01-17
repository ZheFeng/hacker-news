import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Map } from 'immutable';

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


  it('show missed warning message', () => {
  // Render a checkbox with label in the document
    const noMatch = shallow(<NoMatch location={location} />);

    expect(noMatch.find('p').text()).toEqual(`Sorry but ${location.pathname} didn’t match any pages`);
  });
});
