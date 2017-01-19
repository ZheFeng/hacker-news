// @flow
import React, { PropTypes } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import { connect } from 'react-redux';

import News from './containers/News';
import Layout from './components/Layout';
import NoMatch from './components/NoMatch';
import { setTopic } from './actions';


const App = ({ dispatch, topic }) => (
  <BrowserRouter>
    <Layout>
      <div className="row justify-content-md-center">
        <div className="col-4">
          <p>{topic}</p>
          <Match
            pattern="/:topic"
            render={({ params: { topic } }) => <News />}
          />
          <Match
            pattern="/" exactly
            render={() => <News />}
          />
        </div>
      </div>
      <Miss component={NoMatch} />
    </Layout>
  </BrowserRouter>
);

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => ({ topic: state.topic }))(App);
