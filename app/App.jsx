// @flow
import React, { Component, PropTypes } from 'react';
import { Match, Miss } from 'react-router';
import { Provider, connect } from 'react-redux';
import Router from 'react-router-addons-controlled/ControlledBrowserRouter';

import News from './containers/News';
import Layout from './components/Layout';
import NoMatch from './components/NoMatch';
import history from './history';
import actions from './actions';
import store from './store';


function mapStateToProps(state) {
  return {
    location: state.get('router').location,
    action: state.get('router').action,
    topic: state.get('topic'),
  };
}


class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    action: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetch());
  }
  render() {
    const { dispatch, location, action, topic } = this.props;
    return (
      <Router
        history={history}
        location={location}
        action={action}
        onChange={(nextLocation, nextAction) => {
          // you must always dispatch a `SYNC` action,
          // because, guess what? you can't actual control the browser history!
          // anyway, use your current action not "SYNC"
          if (action === 'SYNC') {
            dispatch(actions.navigate({
              location: nextLocation, action,
            }));
          } else if (!window.block) {// eslint-disable-line
            // if you want to block transitions go into the console and type in
            // `window.block = true` and transitions won't happen anymore
            dispatch(actions.navigate({
              location: nextLocation,
              action: nextAction,
            }));
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
                render={() => <News />}
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
  }
}

const AppBinded = connect(mapStateToProps)(App);
const Application = () => <Provider store={store}><AppBinded /></Provider>;
export default Application;
