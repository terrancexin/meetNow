// React
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// Components
import App from './app';
import Welcome from './welcome/welcome';
import HomePage from './home/home_page';
import AuthForm from './authform/auth_form';
import Groups from './groups/groups';
import GroupsForm from './groups/groups_form';
import GroupIndex from './groups/groups_index';
import GroupsShow from './groups/groups_show';

const Root = ({ store }) => {

  const _ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (!currentUser) {
      replace('/login');
    }
  };

  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace('/');
    }
  };

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Welcome} />
        </Route>
        <Route path='groups' component={Groups} />
        <Route path='groups/:groupId' component={GroupsShow} />
        <Route path='groupsform' component={GroupsForm} />
      </Router>
    </Provider>
  );
};

export default Root;
