// @flow
import React, { PropTypes } from 'react';


function dateDisplay(time) {
  const d = new Date(time);
  return d.toDateString();
}


const ContentItem = (
  {
    title, time, text, url,
  }: {
    title: string, time: number, text: string, url: string
  },
) => (
  <div className="card" style={{ margin: '10px' }}>
    <div className="card-block">
      <h4 className="card-title">{title}</h4>
      <h6 className="card-subtitle mb-2 text-muted">
        {dateDisplay(time * 1000)}
      </h6>
      <p className="card-text">{text}</p>
      <a
        href={url}
        className="card-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {url}
      </a>
    </div>
  </div>
);

ContentItem.propTypes = {
  title: PropTypes.string.isRequired,
  time: PropTypes.number,
  text: PropTypes.string,
  url: PropTypes.string,
};
ContentItem.defaultProps = {
  time: null,
  text: null,
  url: null,
};

export default ContentItem;
