import React, { PropTypes } from 'react';
import { Map } from 'immutable';

const codeStyle = {
  fontSize: '10px',
  color: '#ddd',
  display: 'none',
};

function dateDisplay(time) {
  const d = new Date(time);
  return d.toDateString();
}

const ContentItem = ({ data }) => (
  <div className="card" style={{ margin: '10px' }}>
    <div className="card-block">
      <h4 className="card-title">{data.get('title')}</h4>
      <h6 className="card-subtitle mb-2 text-muted">{dateDisplay(data.get('time'))}</h6>
      <p className="card-text">{data.get('text')}</p>
      <a
        href="{data.get('url')}"
        className="card-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {data.get('url')}
      </a>
      <pre style={codeStyle} className="pre-scrollable">
        <code>
          {JSON.stringify(data.toObject(), null, ' ')}
        </code>
      </pre>
    </div>
  </div>
);

ContentItem.propTypes = {
  data: PropTypes.instanceOf(Map).isRequired,
};

export default ContentItem;
