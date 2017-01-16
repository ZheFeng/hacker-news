import React, { Component, PropTypes } from 'react';
import { List, Map, fromJS } from 'immutable';

import ContentItem from '../components/ContentItem';

function loadData(...args) {
  return fetch(...args);
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
  static displayName = 'News';
  static propTypes = {
    topic: PropTypes.string,
    selectedStory: PropTypes.instanceOf(Map),
    onStoryClick: PropTypes.func,
  }
  static defaultProps = {
    topic: 'topstories',
    selectedStory: new Map(),
    onStoryClick: v => v,
  }
  state = {
    data: new List(),
    ids: new List(),
    start: 0,
    numberPerPage: 10,
    fetching: true,
  }
  componentWillMount() {
    const { topic } = this.props;
    const { numberPerPage } = this.state;
    this.props.onStoryClick(null);
    fetchIds(topic)
    .then(ids => this.setState({ ids }) || ids)
    .then(fetchData.bind(this, 0, numberPerPage))
    .then(data => this.setData(data));
  }
  componentWillReceiveProps(nextProps) {
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
  onPageChange(index) {
    const { numberPerPage } = this.state;
    const start = (index - 1) * numberPerPage;
    if (start !== this.state.start) {
      this.setState({ start, fetching: true, data: new List() });
      this.props.onStoryClick(null);
      fetchData(start, numberPerPage, this.state.ids)
      .then(data => this.setData(data));
    }
  }
  setData(data) {
    this.setState({ data, fetching: false });
    this.props.onStoryClick(data.first());
  }
  render() {
    const { fetching, data } = this.state;
    const node = fetching ? (
      <div>Loading...</div>
    ) : data.map(item => <ContentItem data={item} />);
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
    this.props.onStoryClick(null);
  }
}

export default News;
