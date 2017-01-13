import React, { Component, PropTypes } from 'react';
import { List, fromJS } from 'immutable';

import ContentList from '../components/ContentList';


function fetchItem(id) {
  const newsApi = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  return fetch(newsApi)
  .then(response => response.json())
  .then(data => fromJS(data));
}

class News extends Component {
  static displayName = 'News';
  static propTypes = {
    topic: PropTypes.string,
  }
  static defaultProps = {
    topic: 'topstories',
  }
  state = {
    data: new List(),
    ids: new List(),
    start: 0,
    numberPerPage: 10,
  }
  componentWillMount() {
    this.fetchIds();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.topic !== this.props.topic) {
      this.fetchIds();
    }
  }
  render() {
    return (
      <div>
        <ContentList data={this.state.data} />
      </div>
    );
  }
  fetchData() {
    const { start, numberPerPage, ids } = this.state;
    ids.slice(start, numberPerPage);
    return Promise.all(ids.slice(start, numberPerPage).map(fetchItem))
    .then(data => this.setState({ data: fromJS(data) }));
  }
  fetchIds() {
    const { topic } = this.props;
    const newsApi = `https://hacker-news.firebaseio.com/v0/${topic}.json`;
    if (this.state.data.size > 0) {
      this.setState({ data: new List() });
    }
    if (this.state.start > 0) {
      this.setState({ start: 0, end: 10 });
    }
    return fetch(newsApi)
    .then(response => response.json())
    .then(data => this.setState({ ids: new List(data) }))
    .then(this.fetchData.bind(this));
  }
}

export default News;
