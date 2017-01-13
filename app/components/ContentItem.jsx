import React, { PropTypes } from 'react';
import { Map } from 'immutable';

const codeStyle = {
  fontSize: '10px',
  color: '#ddd',
  display: 'none',
};
const ContentItem = ({ data }) => (
  <div>
    <a href={data.get('url')} target="_blank" rel="noopener noreferrer">
      {data.get('title')}
    </a>
    <pre style={codeStyle} className="pre-scrollable">
      <code>
        {JSON.stringify(data.toObject(), null, ' ')}
      </code>
    </pre>
  </div>
);

ContentItem.propTypes = {
  data: PropTypes.instanceOf(Map).isRequired,
};

export default ContentItem;
