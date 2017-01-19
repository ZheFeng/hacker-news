// @flow
import React, { PropTypes } from 'react';
import { List } from 'immutable';

import ContentItem from '../components/ContentItem';

const ContentList = ({ list }) => (
  <div>
    {
      list.map(item => (
        <ContentItem
          title={item.get('title')}
          time={item.get('time')}
          text={item.get('text')}
          url={item.get('url')}
          key={item.get('id')}
        />
      ))
    }
  </div>
);

ContentList.propTypes = {
  list: PropTypes.instanceOf(List).isRequired,
};

export default ContentList;
