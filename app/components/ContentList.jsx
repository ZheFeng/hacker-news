import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';

import ContentItem from './ContentItem';


const ContentList = ({ data, onItemClick, selectedItem }) => (
  <ul className="list-group">
    {
      data.map(
        (item) => {
          const { id, url } = item;
          const onClick = (e) => {
            if (!url) {
              e.preventDefault();
            }
            onItemClick(item);
          };
          const active = selectedItem.get('id') === id ?
            'active' : '';
          return (
            <a
              href={url}
              onClick={onClick}
              className={`list-group-item ${active}`}
              target="_black"
              key={id}
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
