import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';

import ContentItem from './ContentItem';


const ContentList = ({ data, onItemClick, selectedItem }) => (
  <ul className="list-group">
    {
      data.map(
        (item) => {
          const onClick = (e) => {
            e.preventDefault();
            onItemClick(item);
          };
          const active = selectedItem.get('id') === item.get('id') ?
            'active' : '';
          return (
            <a
              href={item.get('url')}
              onClick={onClick}
              className={`list-group-item ${active}`}
              key={item.get('id')}
            >
              <ContentItem data={item} />
            </a>
          );
        },
      )
    }
  </ul>
);

ContentList.propTypes = {
  data: PropTypes.instanceOf(List).isRequired,
  selectedItem: PropTypes.instanceOf(Map),
  onItemClick: PropTypes.func,
};
ContentList.defaultProps = {
  selectedItem: new Map(),
  onItemClick: v => v,
};


export default ContentList;
