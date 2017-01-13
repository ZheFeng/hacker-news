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

function nav(text, { isActive, href, onClick }) {
  return (
    <li className={`nav-item ${isActive ? 'active' : ''}`}>
      <a className="nav-link" onClick={onClick} href={href}>
        {text}
      </a>
    </li>
  );
}

const App = () => (
  // 2. render a `Router`, it will listen to the url changes
  //    and make the location available to other components
  //    automatically
  <BrowserRouter>
    <div>
      <nav
        className="navbar navbar-toggleable-md navbar-inverse bg-primary"
      >
        <Link className="navbar-brand" to="/">Hacker News</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <Link to="/newstories">{nav.bind(null, 'News')}</Link>
            <Link to="/beststories">{nav.bind(null, 'Best')}</Link>
            <Link to="/askstories">{nav.bind(null, 'Ask')}</Link>
            <Link to="/showstories">{nav.bind(null, 'Show')}</Link>
            <Link to="/jobstories">{nav.bind(null, 'Job')}</Link>
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
