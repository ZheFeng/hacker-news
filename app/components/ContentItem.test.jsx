import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Map } from 'immutable';

import ContentItem from './ContentItem';

const item = new Map({
  title: 'test title',
  time: 1484625248277,
});

describe('<Layout />', () => {
  it('ContentItem Snapshot Test', () => {
    const component = renderer.create(
      <ContentItem data={item} />,
  );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('ContentItem show title and time', () => {
  // Render a checkbox with label in the document
    const contentItem = shallow(<ContentItem data={item} />);

    const time = (new Date(item.get('time') * 1000)).toDateString();
    expect(contentItem.find('.card-title').text()).toEqual(item.get('title'));
    expect(contentItem.find('.card-subtitle').text()).toEqual(time);
  });
});
