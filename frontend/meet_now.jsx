// React
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
// Components
import configureStore from './store/store';
import Root from './components/root';

import {fetchAllGroups} from './actions/group_actions';

document.addEventListener('DOMContentLoaded', () => {
  // console.log("%cLet's chat! @txin001 \n\nBuilt using: \n• React+Redux \n• ES6 \n• Ruby on Rails \n• PostgreSQL \n-Terrance", 'background: #fff; color: #00adef');

  let store;
  if (window.currentUser){
    const preloadedState = { session: { currentUser: window.currentUser, errors: []}};
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }
  window.store = store;
  // window.fetchAllGroups = fetchAllGroups;

  const root = document.getElementById('root');
  Modal.setAppElement(root);
  ReactDOM.render(<Root store={ store }/>, root);
});
