// @flow
import React, { Component, PropTypes } from 'react';
import { List, fromJS } from 'immutable';

import ContentItem from '../components/ContentItem';

function loadData(url: string) {
  return fetch(url); // eslint-disable-line
}
function fetchItem(id) {
  const newsApi = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  return loadData(newsApi)
  .then(response => response.json())
  .then(data => fromJS(data));
}
function fetchData(start, numberPerPage, ids) {
  const news = ids.slice(start, start + numberPerPage);
  return Promise.all(news.map(fetchItem))
  .then(data => fromJS(data));
}
function fetchIds(topic) {
  const newsApi = `https://hacker-news.firebaseio.com/v0/${topic}.json`;
  return loadData(newsApi)
  .then(response => response.json())
  .then(data => fromJS(data));
}

class News extends Component {
  static displayName: string = 'News';
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
    fetching: true,
  }
  componentDidMount() {
    const { topic } = this.props;
    const { numberPerPage } = this.state;
    fetchIds(topic)
    .then(ids => this.setState({ ids }) || ids)
    .then(fetchData.bind(this, 0, numberPerPage))
    .then(data => this.setData(data));
  }
  componentWillReceiveProps(nextProps: { topic: string }) {
    const { topic } = nextProps;
    const { numberPerPage } = this.state;
    if (this.props.topic !== topic) {
      this.cleanup();
      fetchIds(topic)
      .then(ids => this.setState({ ids }) || ids)
      .then(fetchData.bind(null, 0, numberPerPage))
      .then(data => this.setData(data));
    }
  }
  onPageChange(index: number) {
    const { numberPerPage } = this.state;
    const start = (index - 1) * numberPerPage;
    if (start !== this.state.start) {
      this.setState({ start, fetching: true, data: new List() });
      fetchData(start, numberPerPage, this.state.ids)
      .then(data => this.setData(data));
    }
  }
  setData(data: List) {
    this.setState({ data, fetching: false });
  }
  render() {
    const { fetching, data } = this.state;
    const node = fetching ? (
      <div>Loading...</div>
    ) : data.map(item => <ContentItem data={item} key={item.get('id')} />);
    return (
      <div>
        {node}
      </div>
    );
  }
  cleanup() {
    this.setState({
      data: new List(),
      ids: new List(),
      start: 0,
      numberPerPage: 10,
      fetching: true,
    });
  }
}

export default News;
