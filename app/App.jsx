import React, { Component, PropTypes } from 'react';
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

function nav(text, to) {
  return (
    <Link to={to}>
      {
        ({ isActive, href, onClick }) => (
          <li className={`nav-item ${isActive ? 'active' : ''}`}>
            <a className="nav-link" onClick={onClick} href={href}>
              {text}
            </a>
          </li>
        )
      }
    </Link>
  );
}

class App extends Component {
  constructor() {
    super();
    this.setStory = this.setStory.bind(this);
  }
  state = {
    story: null,
  }
  setStory(story) {
    this.setState({ story });
  }
  render() {
    const { story } = this.state;
    const node = story ? (
      <div className="col-10">
        <pre>
          <code>
            {JSON.stringify(story.toObject(), null, ' ')}
          </code>
        </pre>
      </div>
    ) : null;
    return (
      <BrowserRouter>
        <div>
          <nav
            className="navbar navbar-toggleable-md navbar-inverse bg-primary"
          >
            <Link className="navbar-brand" to="/">Hacker News</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {nav('News', '/newstories')}
                {nav('Best', '/beststories')}
                {nav('Ask', '/askstories')}
                {nav('Show', '/showstories')}
                {nav('Job', '/jobstories')}
              </ul>
            </div>
          </nav>
          <br />
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <Match
                  pattern="/:topic"
                  render={({ params: { topic } }) => this.renderNews(topic)}
                />
                <Match
                  pattern="/" exactly
                  render={() => this.renderNews()}
                />
              </div>
              {node}
            </div>

            <Miss component={NoMatch} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
  renderNews(topic) {
    const { story } = this.state;
    const props = {
      onStoryClick: this.setStory,
    };
    if (topic) {
      props.topic = topic;
    }
    if (story) {
      props.selectedStory = story;
    }
    return (
      <News {...props} />
    );
  }
}


// function App({ name }) {
//   return <div>Hello {name}</div>;
// }
// App.propTypes = {
//   name: PropTypes.string.isRequired,
// };

export default App;
