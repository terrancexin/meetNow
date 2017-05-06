// React
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// Components
import App from './app';
import Welcome from './welcome/welcome';
import ExplorePage from './explore/explore_page';
import ProfilePage from './profile/profile_page';
import RedirectLogInForm from './forms/redirect_login_form';

import GroupsIndex from './groups/groups_index';
import GroupsShow from './groups/groups_show';
import GroupForm from './groups/group_form';
import EditGroupForm from './groups/edit_group_form';

import EventsIndex from './events/events_index';
import EventShow from './events/event_show';


const Root = ({ store }) => {
  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace('/');
    }
  };

  const _ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (!currentUser) {
    replace('/login');
    }
  };

  return (
    <Provider store={ store }>
      <Router onUpdate={() => window.scrollTo(0, 0)} history={ hashHistory }>
        <Route path="/" component={ App }>
          <IndexRoute component={ Welcome } />
          <Route path="/login" component={ RedirectLogInForm } onEnter={ _redirectIfLoggedIn }/>
          <Route path='explore/:category' component={ ExplorePage } />
          <Route path='profile/:id' component={ ProfilePage } />

          <Route path='groups' component={ GroupsIndex } />
          <Route path='new-group' component={ GroupForm } onEnter={ _ensureLoggedIn }/>
          <Route path='groups/:groupId' component={ GroupsShow }>
            <Route path='edit' component={ EditGroupForm } onEnter={ _ensureLoggedIn }/>
            <Route path='events/:eventId' component={ EventShow } />
          </Route>

        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
