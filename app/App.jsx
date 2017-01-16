// @flow
import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';

import News from './containers/News';
import Layout from './components/Layout';
import NoMatch from './components/NoMatch';


const App = () => (
  <BrowserRouter>
    <Layout>
      <div className="row justify-content-md-center">
        <div className="col-4">
          <Match
            pattern="/:topic"
            render={({ params: { topic } }) => <News topic={topic} />}
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


export default App;
