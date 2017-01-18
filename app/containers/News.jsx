// @flow
import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';

import ContentItem from '../components/ContentItem';
import { fetchIds, fetchData } from '../api';


class News extends Component {
  static displayName: string = 'News';
  static propTypes = {
    topic: PropTypes.string,
    count: PropTypes.string,
  }
  static defaultProps = {
    topic: 'topstories',
    count: '',
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
  setData(data: List<*>) {
    this.setState({ data, fetching: false });
  }
  render() {
    const { fetching, data } = this.state;
    const node = fetching ? (
      <div>Loading...</div>
    ) : data.map(item => (
      <ContentItem
        title={item.get('title')}
        time={item.get('time')}
        text={item.get('text')}
        url={item.get('url')}
        key={item.get('id')}
      />
    ));
    return (
      <div>
        {this.props.count}
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

function mapStateToProps(state: string) {
  return {
    count: state,
  };
}

export default connect(mapStateToProps)(News);
