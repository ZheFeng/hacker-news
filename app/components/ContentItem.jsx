import React, { PropTypes } from 'react';
import { Map } from 'immutable';

const codeStyle = {
  fontSize: '10px',
  color: '#ddd',
  display: 'none',
};
const ContentItem = ({ data }) => (
  <div>
    {data.get('title')}
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
