import React, { PropTypes } from 'react';
import { List } from 'immutable';

import ContentItem from './ContentItem';

const ContentList = ({ data }) => (
  <ul>
    {
      data.map(
        item => <li key={item.get('id')}><ContentItem data={item} /></li>,
      )
    }
  </ul>
);

ContentList.propTypes = {
  data: PropTypes.instanceOf(List).isRequired,
};

export default ContentList;
