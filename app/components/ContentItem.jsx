import React, { PropTypes } from 'react';
import { Map } from 'immutable';

const commentStyle = {
  fontSize: '10px',
  color: '#ddd',
};
const ContentItem = ({ data }) => (
  <div>
    <a href={data.get('url')} target="_blank" rel="noopener noreferrer">
      {data.get('title')}
    </a>

    <p style={commentStyle}>{JSON.stringify(data.toObject())}</p>
  </div>
);

ContentItem.propTypes = {
  data: PropTypes.instanceOf(Map).isRequired,
};

export default ContentItem;
