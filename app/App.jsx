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
      <ul>
        {/* 3. Link to some paths with `Link` */}
        <li><Link to="/">Top</Link></li>
        <li><Link to="/newstories">News</Link></li>
        <li><Link to="/beststories">Best</Link></li>
        <li><Link to="/askstories">Ask</Link></li>
        <li><Link to="/showstories">Show</Link></li>
        <li><Link to="/jobstories">Job</Link></li>
      </ul>

      <hr />
      {/* 4. Render some `<Match/>` components.
             When the current location matches the `pattern`
             then the `component` will render.
      */}
      <Match
        pattern="/:topic" render={({ params: { topic } }) => (
          <News topic={topic} />
        )}
      />
      <Match exactly pattern="/" component={News} />


      {/* If none of those match, then a sibling `Miss` will render. */}
      <Miss component={NoMatch} />
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
