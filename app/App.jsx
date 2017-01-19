// @flow
import React, { PropTypes } from 'react';
import { Match, Miss } from 'react-router';
import { Provider, connect } from 'react-redux';
import Router from 'react-router-addons-controlled/ControlledBrowserRouter';
import { createStore } from 'redux';

import News from './containers/News';
import Layout from './components/Layout';
import NoMatch from './components/NoMatch';
import Store from './reducers';
import history from './history';
import { navigate } from './actions';


const store = createStore(Store);

const App = ({ dispatch, location, action, topic }) => (
  <Router
    history={history}
    location={location}
    action={action}
    onChange={(nextLocation, nextAction) => {
      // you must always dispatch a `SYNC` action,
      // because, guess what? you can't actual control the browser history!
      // anyway, use your current action not "SYNC"
      if (action === 'SYNC') {
        dispatch(navigate(nextLocation, action));
      } else if (!window.block) {// eslint-disable-line
        // if you want to block transitions go into the console and type in
        // `window.block = true` and transitions won't happen anymore
        dispatch(navigate(nextLocation, nextAction));
      } else {
        console.log('blocked!') // eslint-disable-line
      }
    }}
  >
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
  </Router>
);

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  action: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
};

const AppBinded = connect(state => ({
  location: state.router.location,
  action: state.router.action,
  topic: state.topic,
}))(App);

export default () => <Provider store={store}><AppBinded /></Provider>;
