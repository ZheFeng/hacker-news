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

function fetchData(start, numberPerPage, ids) {
  const news = ids.slice(start, start + numberPerPage);
  return Promise.all(news.map(fetchItem))
  .then(data => fromJS(data));
}
function fetchIds(topic) {
  const newsApi = `https://hacker-news.firebaseio.com/v0/${topic}.json`;
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
    const { topic } = this.props;
    const { numberPerPage } = this.state;
    fetchIds(topic)
    .then(ids => this.setState({ ids }) || ids)
    .then(fetchData.bind(this, 0, numberPerPage))
    .then(data => this.setState({ data, fetching: false }));
  }
  componentWillReceiveProps(nextProps) {
    const { topic } = nextProps;
    const { numberPerPage } = this.state;
    if (this.props.topic !== topic) {
      this.cleanup();
      fetchIds(topic)
      .then(ids => this.setState({ ids }) || ids)
      .then(fetchData.bind(null, 0, numberPerPage))
      .then(data => this.setState({ data, fetching: false }));
    }
  }
  onPageChange(index) {
    const { numberPerPage } = this.state;
    const start = (index - 1) * numberPerPage;
    if (start !== this.state.start) {
      this.setState({ start, fetching: true, data: new List() });
      fetchData(start, numberPerPage, this.state.ids)
      .then(data => this.setState({ data, fetching: false }));
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
