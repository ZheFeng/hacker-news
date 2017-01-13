import React, { PropTypes } from 'react';
import { BrowserRouter, Match, Miss, Link } from 'react-router';

import News from './containers/News';


const NoMatch = ({ location }) => (
  <div>
    <h2>Whoops</h2>
    <p>Sorry but {location.pathname} didn’t match any pages</p>
  </div>
);
NoMatch.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};


const App = () => (
  // 2. render a `Router`, it will listen to the url changes
  //    and make the location available to other components
  //    automatically
  <BrowserRouter>
    <div>
      <nav
        className="navbar navbar-toggleable-md navbar-light bg-faded "
      >
        <Link className="navbar-brand" to="/">Hacker News</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/newstories">News</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/beststories">Best</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/askstories">Ask</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/showstories">Show</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/jobstories">Job</Link>
            </li>
          </ul>
        </div>
      </nav>
      <br />
      <div className="container-fluid">
        <Match
          pattern="/:topic" render={({ params: { topic } }) => (
            <News topic={topic} />
          )}
        />
        <Match exactly pattern="/" component={News} />

        <Miss component={NoMatch} />
      </div>
    </div>
  </BrowserRouter>
);


// function App({ name }) {
//   return <div>Hello {name}</div>;
// }
// App.propTypes = {
//   name: PropTypes.string.isRequired,
// };

export default App;
