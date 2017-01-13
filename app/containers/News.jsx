import React, { Component, PropTypes } from 'react';
import { List, fromJS } from 'immutable';

import ContentList from '../components/ContentList';
import Pagination from '../components/Pagination';


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
    fetching: true,
  }
  componentWillMount() {
    this.fetchIds();
  }
  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;
    const { start } = this.state;
    if (prevProps.topic !== topic) {
      this.fetchIds();
    }
    if (prevProps.topic === topic && prevState.start !== start) {
      this.fetchData();
    }
  }
  onPageChange(index) {
    const { numberPerPage } = this.state;
    const start = (index - 1) * numberPerPage;
    if (start !== this.state.start) {
      this.setState({ start });
    }
  }
  render() {
    const { start, numberPerPage, ids, fetching } = this.state;
    const total = Math.ceil(ids.size / numberPerPage);
    const current = (start / numberPerPage) + 1;
    const onPageChange = this::this.onPageChange;
    const node = fetching ? (
      <div>Loading</div>
    ) : (<ContentList data={this.state.data} />);
    return (
      <div>
        <Pagination
          total={total || 1}
          current={current}
          onPageChange={onPageChange}
          disabled={fetching}
        />
        {node}
      </div>
    );
  }
  fetchData() {
    const { start, numberPerPage } = this.state;
    this.cleanupData();
    if (!this.state.fetching) {
      this.setState({ fetching: true });
    }
    const ids = this.state.ids.slice(start, start + numberPerPage);
    return Promise.all(ids.map(fetchItem))
    .then(data => this.setState({ data: fromJS(data), fetching: false }));
  }
  fetchIds() {
    const { topic } = this.props;
    const newsApi = `https://hacker-news.firebaseio.com/v0/${topic}.json`;
    this.cleanupData();
    if (this.state.start > 0) {
      this.setState({ start: 0, end: 10 });
    }
    if (!this.state.fetching) {
      this.setState({ fetching: true });
    }
    return fetch(newsApi)
    .then(response => response.json())
    .then(data => this.setState({ ids: new List(data) }))
    .then(this.fetchData.bind(this));
  }
  cleanupData() {
    if (this.state.data.size > 0) {
      this.setState({ data: new List() });
    }
  }
}

export default News;
