import React, { PropTypes } from 'react';

function App({ name }) {
  return <div>Hello {name}</div>;
}
App.propTypes = {
  name: PropTypes.string.isRequired,
};

export default App;
