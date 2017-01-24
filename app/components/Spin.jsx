// @flow
import React, { Component } from 'react';

const inner = {
  borderRadius: '100%',
  transition: 'all 1000ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  // position: 'absolute',
  width: '32px',
  height: '32px',
  border: '2px solid #0275d8',
  borderTopColor: 'transparent',
  transform: 'rotate(0deg)',
  margin: '0 auto',
};

class Spin extends Component {
  state = {
    rotate: 0,
  }
  componentDidMount() {
    this.timer = setTimeout(this.setPercentage.bind(this), 100);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  setPercentage() {
    const { rotate } = this.state;
    return this.setState(
      { rotate: rotate + 180 },
      () => this.timer = setTimeout(this.setPercentage.bind(this), 1000),
    );
  }
  render() {
    const { rotate } = this.state;
    const style = { ...inner, transform: `rotate(${rotate}deg)` };
    return (
      <div><div style={style} /></div>
    );
  }
  timer = null
}


// ContentItem.propTypes = {
//   title: PropTypes.string.isRequired,
//   time: PropTypes.number,
//   text: PropTypes.string,
//   url: PropTypes.string,
// };
// ContentItem.defaultProps = {
//   time: null,
//   text: null,
//   url: null,
// };

export default Spin;
