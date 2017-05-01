// React
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// Components
import App from './app';
import Welcome from './welcome/welcome';
import Groups from './groups/groups';
import GroupsShow from './groups/groups_show';
import EventsIndex from './events/events_index';
import EventShow from './events/event_show';
import ExplorePage from './explore/explore_page';
import ProfilePage from './profile/profile_page';

const Root = ({ store }) => {

  return (
    <Provider store={store}>
      <Router onUpdate={() => window.scrollTo(0, 0)} history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Welcome} />
          <Route path='explore/:category' component={ExplorePage} />
          <Route path='groups' component={Groups} />
          <Route path='groups/:groupId' component={GroupsShow}>
              <Route path='events/:eventId' component={EventShow}/>
          </Route>
          <Route path='profile/:id' component={ProfilePage} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
