import React, { Component } from 'react';
import { List, fromJS } from 'immutable';

import ContentList from '../components/ContentList';

function fetchItem(id) {
  const newsApi = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  return fetch(newsApi)
  .then(response => response.json())
  .then(data => fromJS(data));
}
function fetchNews(type, start, end) {
  const newsApi = `https://hacker-news.firebaseio.com/v0/${type}.json`;
  return fetch(newsApi)
  .then(response => response.json())
  .then(data => data.slice(start, end).map(fetchItem))
  .then(items => Promise.all(items));
}

class News extends Component {
  static displayName = 'News';
  state = {
    data: new List(),
    start: 0,
    end: 10,
  }
  componentWillMount() {
    fetchNews('topstories', this.state.start, this.state.end)
    .then(data => this.setState({ data: fromJS(data) }));
  }
  render() {
    return (
      <ContentList data={this.state.data} />
    );
  }
}

export default News;
