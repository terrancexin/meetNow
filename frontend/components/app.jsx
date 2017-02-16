import React from 'react';
import HeaderContainer from './home/header_container';
import FooterContainer from './home/footer_container';

const App = ({ children }) => (
  <div>
    <HeaderContainer />
    
    { children }
    <FooterContainer />
  </div>
);

export default App;
