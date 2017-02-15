import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import SessionFormContainer from './session/session_form_container';

const Root = ({ store }) => {
  const _ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser.username;
    console.log(currentUser, "logged in ensure");
    if (!currentUser) replace('/login');
  };

  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser.username;
    console.log(currentUser, "logged in redirect");
    if (currentUser) replace('/home');
  };

  const _createAccount = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser.username;
    if (!currentUser) replace('/signup');
  };

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <Route path='signup' component={SessionFormContainer} onEnter={_redirectIfLoggedIn} />
          <Route path='login' component={SessionFormContainer} onEnter={_redirectIfLoggedIn} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
