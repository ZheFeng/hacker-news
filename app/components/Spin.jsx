// @flow
import React, { Component } from 'react';

const inner = {
  borderRadius: '100%',
  transition: 'all 1000ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  // position: 'absolute',
  width: '16px',
  height: '16px',
  border: '1px solid #0275d8',
  borderRightColor: 'transparent',
  borderLeftColor: 'transparent',
  transform: 'rotate(0deg)',
  margin: '0 auto',
};

class Spin extends Component {
  state = {
    rotate: 0,
  }
  componentDidMount() {
    setTimeout(this.setPercentage.bind(this), 100);
  }
  setPercentage() {
    const { rotate } = this.state;
    return this.setState(
      { rotate: rotate + 180 },
      () => setTimeout(this.setPercentage.bind(this), 1000),
    );
  }
  render() {
    const { rotate } = this.state;
    const style = { ...inner, transform: `rotate(${rotate}deg)` };
    return (
      <div><div style={style} /></div>
    );
  }
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
