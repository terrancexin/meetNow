import React from 'react';
import WelcomeHeader from './welcome/welcome_header';
import WelcomeFooter from './welcome/welcome_footer';

const App = ({ children }) => (
  <div className='app-container'>
    <WelcomeHeader />
    { children }
    <WelcomeFooter />
  </div>
);

export default App;
