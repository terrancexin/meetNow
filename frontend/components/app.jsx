import React from 'react';
import HeaderContainer from './shared/header_container';

const App = ({ children }) => (
  <div className="app">
    <HeaderContainer />
      {children}
  </div>
);

export default App;
