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
  render() {
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
            <div className="row justify-content-md-center">
              <div className="col-4">
                <Match
                  pattern="/:topic"
                  render={({ params: { topic } }) => this.renderNews(topic)}
                />
                <Match
                  pattern="/" exactly
                  render={() => this.renderNews()}
                />
              </div>
            </div>

            <Miss component={NoMatch} />
          </div>
        </div>
      </BrowserRouter>
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
